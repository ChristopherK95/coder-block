package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
	"time"
)

func main() {
	now := strings.Split(time.Now().Format(time.RFC3339), "T")[0] + "T22:00:00.000Z"
	fmt.Println(now)
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
