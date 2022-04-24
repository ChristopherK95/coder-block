package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func getJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Connection", "keep-alive")

	var jobs []JobPreview

	result, _ := db.Query("SELECT JobId, Title, CompanyName, Municipality, PublishedDate, Keywords FROM job LIMIT 100;")
	if err != nil {
		fmt.Println(err)
	}

	for result.Next() {
		var job JobPreview
		err := result.Scan(&job.JobId, &job.Title, &job.CompanyName, &job.Municipality, &job.PublishedDate)
		if err != nil {
			fmt.Println(err)
		}
		jobs = append(jobs, job)
	}
	defer result.Close()
	json.NewEncoder(w).Encode(jobs)
}

type Keyword struct {
	Keyword string `json:"keyword"`
}

func getJobsFiltered(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Headers", "content-type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(200)
		return
	}

	var jobs []JobPreview
	var keywordJSON Keyword
	var keyword string
	json.NewDecoder(r.Body).Decode(&keywordJSON)
	keyword = "'" + keywordJSON.Keyword + "'"

	fmt.Println(keyword)
	result, err := db.Query(`SELECT JobId, Title, CompanyName, Municipality, PublishedDate, Keywords FROM job WHERE INSTR(Keywords, ?) > 0 LIMIT 100;`, keyword)
	if err != nil {
		fmt.Println(err)
	}
	defer result.Close()

	for result.Next() {
		var job JobPreview
		err := result.Scan(&job.JobId, &job.Title, &job.CompanyName, &job.Municipality, &job.PublishedDate)
		if err != nil {
			fmt.Println(err)
		}
		jobs = append(jobs, job)
	}
	defer result.Close()

	data, err := json.Marshal(jobs)
	if err != nil {
		fmt.Println(err)
	}
	w.Write(data)
}

func search(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Headers", "content-type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(200)
		return
	}

	type Search struct {
		Input     string   `json:"input"`
		Locations []string `json:"locations"`
		Keywords  []string `json:"keywords"`
	}

	var search Search
	var jobs []JobPreview
	json.NewDecoder(r.Body).Decode(&search)
	fmt.Println(search)

	var query string
	var args []interface{}

	switch true {
	case search.Input != "" && len(search.Locations) > 0 && len(search.Keywords) > 0:
		query =
			`SELECT 
						JobId,
						Title, 
						Occupation, 
						CompanyName, 
						Municipality, 
						PublishedDate, 
						LastApplicationDate 
					FROM 
						job 
					WHERE 
						INSTR(Title, ?) 
						AND Municipality in (`
		for i := 0; i < len(search.Locations); i++ {
			if i == len(search.Locations)-1 {
				query += "?)"
			} else {
				query += "?,"
			}
		}
		for i := 0; i < len(search.Keywords); i++ {
			query += " AND EXISTS (SELECT JobId FROM keywords WHERE Label = ? and job.JobId = keywords.JobId) "
		}
		query += "LIMIT 50;"
		args = append(args, search.Input)
		for i := 0; i < len(search.Locations); i++ {
			args = append(args, search.Locations[i])
		}
		for i := 0; i < len(search.Keywords); i++ {
			args = append(args, search.Keywords[i])
		}
	case len(search.Locations) > 0 && len(search.Keywords) > 0:
		query =
			``
	}

	if query != "" {
		result, err := db.Query(query, args...)
		if err != nil {
			fmt.Println(err)
		}

		for result.Next() {
			var job JobPreview
			err := result.Scan(&job.JobId, &job.Title, &job.Occupation, &job.CompanyName, &job.Municipality, &job.PublishedDate, &job.LastApplicationDate)
			if err != nil {
				fmt.Println(err)
			}

			res, err := db.Query("SELECT Label FROM keywords WHERE JobId = ?", job.JobId)
			if err != nil {
				fmt.Println(err)
			}

			for res.Next() {
				var keyword string
				err := res.Scan(&keyword)
				if err != nil {
					fmt.Println(err)
				}
				job.Keywords = append(job.Keywords, keyword)
			}

			job.Title = string(bytes.Trim([]byte(job.Title), "\xef\xbb\xbf"))
			jobs = append(jobs, job)
		}

		defer result.Close()
		json.NewEncoder(w).Encode(jobs)
	}
}

func getJob(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Headers", "content-type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(200)
		return
	}

	type Id struct {
		Id string `json:"id"`
	}

	var id Id
	json.NewDecoder(r.Body).Decode(&id)

	result, err := db.Query(getPageSQL, id.Id)
	if err != nil {
		fmt.Println(err)
	}

	var job Job
	for result.Next() {
		result.Scan(
			&job.JobId,
			&job.Title,
			&job.Occupation,
			&job.CompanyName,
			&job.Region,
			&job.Municipality,
			&job.Description,
			&job.ApplyLink,
			&job.Email,
			&job.PublishedDate,
			&job.LastApplicationDate,
			&job.Positions,
			&job.Keywords,
		)
	}
	fmt.Println(job)
	defer result.Close()
	json.NewEncoder(w).Encode(job)
}

var db *sql.DB
var err error

func main() {
	tlsConf := createTLSConf()
	err := mysql.RegisterTLSConfig("custom", &tlsConf)
	if err != nil {
		fmt.Println(err)
	}

	db, err = sql.Open("mysql", "chrkar:Swoleness[{}]1995@tcp(codeblock-db-dev.mysql.database.azure.com:3306)/codeblock_dev?tls=true")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		fmt.Println(err)
	}

	r := mux.NewRouter()

	r.HandleFunc("/api/search", search).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/jobs", getJobs).Methods("GET")
	r.HandleFunc("/api/jobs-filter", getJobsFiltered).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/get-job", getJob).Methods("POST", "OPTIONS")

	log.Fatal(http.ListenAndServe(":8000", r))
	initFetch()
	time.AfterFunc(duration(), initFetch)

}
