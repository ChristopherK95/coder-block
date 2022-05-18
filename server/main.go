package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"strconv"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func getJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Connection", "keep-alive")

	type Response struct {
		Jobs         []JobPreview `json:"jobs"`
		NumberofJobs int          `json:"numberofJobs"`
		Pages        int          `json:"pages"`
	}
	var res Response

	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	var jobs []JobPreview

	result, _ := db.Query("SELECT JobId, Title, Occupation, CompanyName, Municipality, PublishedDate, LastApplicationDate FROM job LIMIT " + strconv.Itoa(page*50) + ",50;")
	if err != nil {
		fmt.Println(err)
	}

	for result.Next() {
		var job JobPreview
		err := result.Scan(&job.JobId, &job.Title, &job.Occupation, &job.CompanyName, &job.Municipality, &job.PublishedDate, &job.LastApplicationDate)
		if err != nil {
			fmt.Println(err)
		}

		keys, err := db.Query("SELECT Label FROM keywords WHERE JobId = ?", job.JobId)
		if err != nil {
			fmt.Println(err)
		}
		defer keys.Close()

		for keys.Next() {
			var keyword string
			err := keys.Scan(&keyword)
			if err != nil {
				fmt.Println(err)
			}
			job.Keywords = append(job.Keywords, keyword)
		}
		jobs = append(jobs, job)
	}
	defer result.Close()

	db.QueryRow("SELECT COUNT(JobId) FROM job").Scan(
		&res.NumberofJobs,
	)

	res.Jobs = jobs
	res.Pages = int(math.Ceil(float64(res.NumberofJobs) / 50))

	json.NewEncoder(w).Encode(res)
}

type Keyword struct {
	Keyword string `json:"keyword"`
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
		Page      int      `json:"page"`
	}

	var search Search

	type Response struct {
		Jobs         []JobPreview `json:"jobs"`
		NumberofJobs int          `json:"numberofJobs"`
		Pages        int          `json:"pages"`
	}
	var res Response

	var jobs []JobPreview
	json.NewDecoder(r.Body).Decode(&search)
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	search.Page = page

	var query string
	var args []interface{}

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
					WHERE `
	if search.Input != "" {
		query += "INSTR(Title, ?)"
	}
	if len(search.Locations) > 0 {
		if search.Input != "" {
			query += "AND Municipality in ("
		} else {
			query += "Municipality in ("
		}
	}

	for i := 0; i < len(search.Locations); i++ {
		if i == len(search.Locations)-1 {
			query += "?)"
		} else {
			query += "?,"
		}
	}

	for i := 0; i < len(search.Keywords); i++ {
		if i == 0 && search.Input == "" && len(search.Locations) == 0 {
			query += " EXISTS (SELECT JobId FROM keywords WHERE Label = ? and job.JobId = keywords.JobId) "
		} else {
			query += " AND EXISTS (SELECT JobId FROM keywords WHERE Label = ? and job.JobId = keywords.JobId) "
		}

	}

	query += "LIMIT " + strconv.Itoa(search.Page*50) + ",50;"
	if search.Input != "" {
		args = append(args, search.Input)
	}

	for i := 0; i < len(search.Locations); i++ {
		args = append(args, search.Locations[i])
	}
	for i := 0; i < len(search.Keywords); i++ {
		args = append(args, search.Keywords[i])
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

			keys, err := db.Query("SELECT Label FROM keywords WHERE JobId = ?", job.JobId)
			if err != nil {
				fmt.Println(err)
			}
			defer keys.Close()

			for keys.Next() {
				var keyword string
				err := keys.Scan(&keyword)
				if err != nil {
					fmt.Println(err)
				}

				job.Keywords = append(job.Keywords, keyword)
			}

			job.Title = string(bytes.Trim([]byte(job.Title), "\xef\xbb\xbf"))
			jobs = append(jobs, job)
		}

		defer result.Close()

		db.QueryRow(totalRowsSQL(search.Input, search.Locations, search.Keywords), args...).Scan(
			&res.NumberofJobs,
		)

		res.Jobs = jobs
		res.Pages = int(math.Ceil(float64(res.NumberofJobs) / 50))

		json.NewEncoder(w).Encode(res)
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
	var job Job
	json.NewDecoder(r.Body).Decode(&id)

	db.QueryRow(getPageSQL, id.Id).Scan(
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
	)
	if err != nil {
		fmt.Println(err)
	}

	res, err := db.Query(getKeywordsSQL, id.Id)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Close()
	for res.Next() {
		var keyword string
		err := res.Scan(
			&keyword,
		)
		if err != nil {
			fmt.Println(err)
		}
		job.Keywords = append(job.Keywords, keyword)
	}
	// }
	// defer result.Close()
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
	r.HandleFunc("/api/get-job", getJob).Methods("POST", "OPTIONS")

	log.Fatal(http.ListenAndServe(":8000", r))
	initFetch()
	time.AfterFunc(duration(), initFetch)

}
