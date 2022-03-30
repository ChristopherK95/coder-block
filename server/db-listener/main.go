package main

import (
	"crypto/tls"
	"crypto/x509"
	"database/sql"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
)

type Job struct {
	JobId               string   `json:"jobId"`
	Title               string   `json:"title"`
	CompanyName         string   `json:"companyName"`
	Region              string   `json:"region"`
	Municipality        string   `json:"municipality"`
	Description         string   `json:"description"`
	ApplyLink           string   `json:"applyLink"`
	Email               string   `json:"email"`
	PublishedDate       string   `json:"publishedDate"`
	LastApplicationDate string   `json:"lastApplicationDate"`
	Positions           int      `json:"positions"`
	Keywords            []string `json:"keywords"`
}

var DBClient *sql.DB

func main() {

	tlsConf := createTLSConf()
	err := mysql.RegisterTLSConfig("custom", &tlsConf)
	if err != nil {
		fmt.Println(err)
	}

	db, err := sql.Open("mysql", "chrkar:Swoleness[{}]1995@tcp(codeblock-db-dev.mysql.database.azure.com:3306)/codeblock_dev?tls=true")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err.Error())
	}

	DBClient = db

	r := gin.Default()
	r.SetTrustedProxies([]string{"192.168.1.18"})

	r.POST("/", CreateJob)

	if err := r.Run(":5000"); err != nil {
		panic(err.Error())
	}

}

func createTLSConf() tls.Config {

	rootCertPool := x509.NewCertPool()
	pem, err := ioutil.ReadFile("./cert/ca-cert.pem")
	if err != nil {
		fmt.Println(err)
	}
	if ok := rootCertPool.AppendCertsFromPEM(pem); !ok {
		fmt.Println("Failed to append PEM.")
	}
	// clientCert := make([]tls.Certificate, 0, 1)

	// mysql.RegisterTLSConfig("custom", &tls)

	// certs, err := tls.LoadX509KeyPair("./cert/client-cert.pem", "./cert/client-key.pem")
	// if err != nil {
	// 	fmt.Println(err)
	// }

	// clientCert = append(clientCert, certs)

	return tls.Config{
		ServerName: "codeblock-db-dev.mysql.database.azure.com",
		RootCAs:    rootCertPool,

		// Certificates:       clientCert,
		// InsecureSkipVerify: true, // needed for self signed certs
	}
}

func CreateJob(c *gin.Context) {
	var reqBody Job

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error":   true,
			"message": "Invalid request body",
		})
		fmt.Println(err)
		return
	}

	var stringArr string

	for i := 0; i < len(reqBody.Keywords); i++ {
		if i == len(reqBody.Keywords)-1 {
			stringArr += "'" + reqBody.Keywords[i] + "'"
		} else {
			stringArr += "'" + reqBody.Keywords[i] + "',"
		}
	}

	_, err := DBClient.Exec("INSERT INTO job (JobId, Title, CompanyName, Region, Municipality, Description, ApplyLink, Email, PublishedDate, LastApplicationDate, Positions, Keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
		reqBody.JobId,
		reqBody.Title,
		reqBody.CompanyName,
		reqBody.Region,
		reqBody.Municipality,
		reqBody.Description,
		reqBody.ApplyLink,
		reqBody.Email,
		reqBody.PublishedDate,
		reqBody.LastApplicationDate,
		reqBody.Positions,
		stringArr,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   true,
			"message": 1,
		})
		fmt.Println(err)
	}

	// c.JSON(http.StatusCreated, gin.H{
	// 	"error": false,
	// 	"id":    id,
	// })
}
