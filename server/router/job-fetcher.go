package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
	"time"
	// _ "github.com/go-sql-driver/mysql"
)

func getAd(id string) (jobData Job) {
	keywordList := []string{
		"React",
		"JavaScript",
		"TypeScript",
		"HTML",
		"HTML5",
		"Angular",
		"C#",
		".Net",
		"C++",
		"CSS",
		"Python",
		"Go",
		"Java",
		"Vue",
		"Kotlin",
		"Android",
		"Swift",
		"C",
		"Ruby",
		"Visual Basic",
		"PHP",
		"SQL",
		"Assembly",
		"R",
		"Dart",
		"Flutter",
		"Electron",
		"NoSQL",
		"Azure",
		"AWS",
		"Git",
		"SASS",
		"LESS",
		"CSS3",
		"Babel",
		"Frontend",
		"Backend",
		"Fullstack",
		"Node",
		"Node.js",
		"NodeJs",
		"Haskell",
		"Rust",
		"Cobol",
	}
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
		fmt.Println(err)
	}

	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)
	in := []byte(string(body))

	var iot AdPage

	err = json.Unmarshal(in, &iot)
	if err != nil {
		fmt.Println(err)
	}

	var job Job

	job.JobId = iot.Id

	job.Title = iot.Title

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
			job.Keywords = append(job.Keywords, keywordList[i])
		}
	}

	return job
}

// 2022-04-23T21:59:59Z
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

type Ad struct {
	Id                   string `json:"id"`
	PublishedDate        string `json:"publishedDate"`
	LastApplicationDate  string `json:"lastApplicationDate"`
	Title                string `json:"title"`
	Occupation           string `json:"occupation"`
	Workplace            string `json:"workplace"`
	WorkplaceName        string `json:"workplaceName"`
	UnspecifiedWorkplace bool   `json:"unspecifiedWorkplace"`
	Published            bool   `json:"published"`
	Positions            int    `json:"positions"`
	SourceLinks          string `json:"sourceLinks"`
}

type Iot struct {
	Positions   int  `json:"id"`
	NumberOfAds int  `json:"numberOfAds"`
	OffsetLimit int  `json:"offsetLimit"`
	Ads         []Ad `json:"ads"`
}

var regions = [21]string{
	"DQZd_uYs_oKb",
	"oDpK_oZ2_WYt",
	"K8iD_VQv_2BA",
	"zupA_8Nt_xcD",
	"wjee_qH2_yb6",
	"65Ms_7r1_RTG",
	"MtbE_xWT_eMi",
	"9QUH_2bb_6Np",
	"tF3y_MF9_h5G",
	"9hXe_F4g_eTG",
	"CaRE_1nn_cSU",
	"CifL_Rzy_Mku",
	"s93u_BEb_sx2",
	"zBon_eET_fFU",
	"EVVp_h6U_GSZ",
	"g5Tt_CAV_zBd",
	"NvUF_SP1_1zo",
	"G6DV_fKE_Viz",
	"zdoY_6u5_Krt",
	"xTCk_nT5_Zjm",
	"oLT3_Q9p_3nn",
}

func getAdsOther(index string, region string) (ads []Ad) {
	url := "https://platsbanken-api.arbetsformedlingen.se/jobs/v1/search"

	payload := strings.NewReader(`{"filters":[{"type":"occupationGroup","value":"DJh5_yyF_hEM"},{"type":"region","value":"` + region + `"}],"fromDate":null,"order":"date","maxRecords":100,"startIndex":` + index + `,"source":"pb"}`)

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
		fmt.Println(err)
	}

	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	in := []byte(string(body))

	var iot Iot

	err = json.Unmarshal(in, &iot)
	if err != nil {
		fmt.Println(err)
	}

	return iot.Ads
}

func sendToDB(job Job) {
	// url := "http://localhost:5000/"

	// data, err := json.Marshal((job))
	// if err != nil {
	// 	panic(err.Error())
	// }

	// payload := strings.NewReader(string(data))

	// req, err := http.NewRequest("POST", url, payload)
	// if err != nil {
	// 	panic(err.Error())
	// }

	// _, err = http.DefaultClient.Do(req)
	// if err != nil {
	// 	fmt.Println(err)
	// }

	var stringArr string

	for i := 0; i < len(job.Keywords); i++ {
		if i == len(job.Keywords)-1 {
			stringArr += "'" + job.Keywords[i] + "'"
		} else {
			stringArr += "'" + job.Keywords[i] + "',"
		}
	}

	_, err = db.Exec("INSERT INTO job (JobId, Title, CompanyName, Region, Municipality, Description, ApplyLink, Email, PublishedDate, LastApplicationDate, Positions, Keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
		job.JobId,
		job.Title,
		job.CompanyName,
		job.Region,
		job.Municipality,
		job.Description,
		job.ApplyLink,
		job.Email,
		job.PublishedDate,
		job.LastApplicationDate,
		job.Positions,
		stringArr,
	)

	if err != nil {
		fmt.Println(err)
	}
}

func getAds(index string, region string) (adIds []string) {
	url := "https://platsbanken-api.arbetsformedlingen.se/jobs/v1/search"

	payload := strings.NewReader(`{"filters":[{"type":"occupationGroup","value":"DJh5_yyF_hEM"},{"type":"region","value":"` + region + `"}],"fromDate":null,"order":"date","maxRecords":100,"startIndex":` + index + `,"source":"pb"}`)

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
		fmt.Println(err)
	}

	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	in := []byte(string(body))

	var iot Iot

	err = json.Unmarshal(in, &iot)
	if err != nil {
		fmt.Println(err)
	}

	var ads []string
	for i := 0; i < len(iot.Ads); i++ {
		ads = append(ads, iot.Ads[i].Id)
	}

	if iot.NumberOfAds > 100 {
		for i := 100; i < iot.NumberOfAds; i += 100 {
			otherAds := getAdsOther(strconv.Itoa(i), region)

			for j := 0; j < len(otherAds); j++ {
				ads = append(ads, otherAds[j].Id)
			}
		}
	}

	return ads
}

func initFetch() {
	var links []string

	for i := 0; i < len(regions); i++ {
		res := getAds("0", regions[i])

		for j := 0; j < len(res); j++ {
			links = append(links, res[j])
		}
	}

	var jobs []Job
	for i := 0; i < len(links); i++ {
		job := getAd(links[i])
		jobs = append(jobs, job)
		fmt.Println("Fetched " + strconv.Itoa(len(jobs)) + "/" + strconv.Itoa(len(links)))
	}
	fmt.Println(len(jobs))
	fmt.Println("Sending jobs")
	for i := 0; i < len(jobs); i++ {
		sendToDB(jobs[i])
		fmt.Println(strconv.Itoa(i+1) + "/" + strconv.Itoa(len(jobs)) + " jobs added to database.")
	}
	fmt.Println("Done!")
	time.AfterFunc(duration(), initFetch)
}

func duration() time.Duration {
	t := time.Now()
	n := time.Date(t.Year(), t.Month(), t.Day(), 12, 0, 0, 0, t.Location())
	if t.After(n) {
		n = n.Add(24 * time.Hour)
	}
	d := n.Sub(t)
	return d
}
