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
		err := result.Scan(&job.JobId, &job.Title, &job.CompanyName, &job.Municipality, &job.PublishedDate, &job.Keywords)
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
		err := result.Scan(&job.JobId, &job.Title, &job.CompanyName, &job.Municipality, &job.PublishedDate, &job.Keywords)
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
		Search   string `json:"search"`
		Location string `json:"location"`
	}

	var title Search
	var jobs []JobPreview
	json.NewDecoder(r.Body).Decode(&title)
	fmt.Println(title)

	result, _ := db.Query("SELECT JobId, Title, CompanyName, Municipality, PublishedDate, Keywords FROM job WHERE INSTR(Title, ?) > 0  LIMIT 100;", title.Search)
	if err != nil {
		fmt.Println(err)
	}

	for result.Next() {
		var job JobPreview
		err := result.Scan(&job.JobId, &job.Title, &job.CompanyName, &job.Municipality, &job.PublishedDate, &job.Keywords)
		if err != nil {
			fmt.Println(err)
		}
		job.Title = string(bytes.Trim([]byte(job.Title), "\xef\xbb\xbf"))
		jobs = append(jobs, job)
	}
	defer result.Close()
	json.NewEncoder(w).Encode(jobs)
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

	log.Fatal(http.ListenAndServe(":8000", r))
	time.AfterFunc(duration(), initFetch)

}
