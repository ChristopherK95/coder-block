package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

// var db *sql.DB
// var err error

func jobUpdater() {
	file, err := os.OpenFile("coderblock-job-updater.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer file.Close()
	log.SetOutput(file)

	var links []string
	date := strings.Split(time.Now().AddDate(0, 0, -1).Format(time.RFC3339), "T")[0] + "T22:00:00.000Z"

	for i := 0; i < len(regions); i++ {
		res := getAds("0", regions[i], date)

		for j := 0; j < len(res); j++ {
			links = append(links, res[j])
		}
	}

	var jobs []ScrapedJob

	for i := 0; i < len(links); i++ {
		job := getAd(links[i])
		jobs = append(jobs, job)
		log.Println("Fetched " + strconv.Itoa(len(jobs)) + "/" + strconv.Itoa(len(links)) + " links")
	}

	log.Println("Sending jobs")
	for i := 0; i < len(jobs); i++ {
		sendToDB(jobs[i])
		log.Println(strconv.Itoa(i+1) + "/" + strconv.Itoa(len(jobs)) + " jobs added to database.")
	}
}

func getAds(index string, region string, date string) (adIds []string) {
	url := "https://platsbanken-api.arbetsformedlingen.se/jobs/v1/search"

	payload := strings.NewReader(`{"filters":[{"type":"occupationGroup","value":"DJh5_yyF_hEM"},{"type":"region","value":"` + region + `"}],"fromDate":"` + date + `","order":"date","maxRecords":100,"startIndex":` + index + `,"source":"pb"}`)

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0")
	req.Header.Add("Accept", "application/json, text/plain, */*")
	req.Header.Add("Accept-Language", "en-US,en;q=0.5")
	req.Header.Add("Accept-Encoding", "gzip, deflate, br")
	req.Header.Add("Requesting-Device-Id", "5ccb975a-9bb0-46f0-9b95-6be76ff2ae1a")
	req.Header.Add("INT_SYS", "platsbanken_web_beta")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Origin", "https://arbetsformedlingen.se")
	req.Header.Add("Connection", "keep-alive")
	req.Header.Add("Referer", "https://arbetsformedlingen.se/")
	req.Header.Add("Sec-Fetch-Dest", "empty")
	req.Header.Add("Sec-Fetch-Mode", "cors")
	req.Header.Add("Sec-Fetch-Site", "same-site")
	req.Header.Add("Cache-Control", "max-age=0")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Println(err)
	}

	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Println(err)
	}

	in := []byte(string(body))

	var iot Iot

	err = json.Unmarshal(in, &iot)
	if err != nil {
		log.Println(err)
	}

	var ads []string
	for i := 0; i < len(iot.Ads); i++ {
		ads = append(ads, iot.Ads[i].Id)
	}

	if iot.NumberOfAds > 100 {
		for i := 100; i < iot.NumberOfAds; i += 100 {
			otherAds := getAdsOther(strconv.Itoa(i), region, date)

			for j := 0; j < len(otherAds); j++ {
				ads = append(ads, otherAds[j].Id)
			}
		}
	}

	return ads
}

func getAdsOther(index string, region string, date string) (ads []Ad) {
	url := "https://platsbanken-api.arbetsformedlingen.se/jobs/v1/search"

	payload := strings.NewReader(`{"filters":[{"type":"occupationGroup","value":"DJh5_yyF_hEM"},{"type":"region","value":"` + region + `"}],"fromDate":"` + date + `","order":"date","maxRecords":100,"startIndex":` + index + `,"source":"pb"}`)

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0")
	req.Header.Add("Accept", "application/json, text/plain, */*")
	req.Header.Add("Accept-Language", "en-US,en;q=0.5")
	req.Header.Add("Accept-Encoding", "gzip, deflate, br")
	req.Header.Add("Requesting-Device-Id", "5ccb975a-9bb0-46f0-9b95-6be76ff2ae1a")
	req.Header.Add("INT_SYS", "platsbanken_web_beta")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Origin", "https://arbetsformedlingen.se")
	req.Header.Add("Connection", "keep-alive")
	req.Header.Add("Referer", "https://arbetsformedlingen.se/")
	req.Header.Add("Sec-Fetch-Dest", "empty")
	req.Header.Add("Sec-Fetch-Mode", "cors")
	req.Header.Add("Sec-Fetch-Site", "same-site")
	req.Header.Add("Cache-Control", "max-age=0")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Println(err)
	}

	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Println(err)
	}

	in := []byte(string(body))

	var iot Iot

	err = json.Unmarshal(in, &iot)
	if err != nil {
		log.Println(err)
	}

	return iot.Ads
}

func getAd(id string) (jobData ScrapedJob) {
	url := ("https://platsbanken-api.arbetsformedlingen.se/jobs/v1/job/" + id)

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0")
	req.Header.Add("Accept", "application/json, text/plain, */*")
	req.Header.Add("Accept-Language", "en-US,en;q=0.5")
	req.Header.Add("Accept-Encoding", "gzip, deflate, br")
	req.Header.Add("Requesting-Device-Id", "5ccb975a-9bb0-46f0-9b95-6be76ff2ae1a")
	req.Header.Add("INT_SYS", "platsbanken_web_beta")
	req.Header.Add("Origin", "https://arbetsformedlingen.se")
	req.Header.Add("Connection", "keep-alive")
	req.Header.Add("Referer", "https://arbetsformedlingen.se/")
	req.Header.Add("Sec-Fetch-Dest", "empty")
	req.Header.Add("Sec-Fetch-Mode", "cors")
	req.Header.Add("Sec-Fetch-Site", "same-site")
	req.Header.Add("Cache-Control", "max-age=0")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Println(err)
	}

	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)
	in := []byte(string(body))

	var iot AdPage

	err = json.Unmarshal(in, &iot)
	if err != nil {
		log.Println(err)
	}

	var job ScrapedJob

	job.JobId = iot.Id

	job.Title = iot.Title

	job.Occupation = iot.Occupation

	job.CompanyName = iot.Company.Name

	job.Region = iot.Workplace.Region

	job.Municipality = iot.Workplace.Municipality

	job.Description = iot.Description

	job.ApplyLink = iot.Application.WebAddress

	job.Email = iot.Application.Email

	job.PublishedDate = convDate(iot.PublishedDate)

	job.LastApplicationDate = convDate(iot.LastApplicationDate)

	job.Positions = iot.Positions

	for i := 0; i < len(keywordList); i++ {
		if !stringInArr(job.Keywords, keywordList[i]) && (strings.Contains(iot.Description, keywordList[i]+" ") || strings.Contains(iot.Description, keywordList[i]+",") || strings.Contains(iot.Description, keywordList[i]+".")) {
			switch keywordList[i] {
			case "HTML5":
				keywordList[i] = "HTML"
			case "CSS3":
				keywordList[i] = "CSS"
			case "Node.js":
				keywordList[i] = "NodeJs"
			case "Node":
				keywordList[i] = "NodeJs"
			}
			job.Keywords = append(job.Keywords, keywordList[i])
		}
	}

	return job
}

func convDate(date string) string {
	a := strings.Replace(date, "T", " ", 1)
	b := strings.Replace(a, "Z", "", 1)
	return b
}

func stringInArr(list []string, item string) bool {
	for _, b := range list {
		if b == item {
			return true
		}
	}
	return false
}

func sendToDB(job ScrapedJob) {
	_, err := db.Exec("INSERT INTO job (JobId, Title, Occupation, CompanyName, Region, Municipality, Description, ApplyLink, Email, PublishedDate, LastApplicationDate, Positions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
		job.JobId,
		job.Title,
		job.Occupation,
		job.CompanyName,
		job.Region,
		job.Municipality,
		job.Description,
		job.ApplyLink,
		job.Email,
		job.PublishedDate,
		job.LastApplicationDate,
		job.Positions,
	)

	for i := 0; i < len(job.Keywords); i++ {
		_, err = db.Exec("INSERT INTO keywords (JobId, Label) VALUES(?, ?);",
			job.JobId,
			job.Keywords[i],
		)
	}

	if err != nil {
		log.Println(err)
	}
}
