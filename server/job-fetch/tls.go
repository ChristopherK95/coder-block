package main

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"io/ioutil"
)

func createTLSConf() tls.Config {
	rootCertPool := x509.NewCertPool()
	pem, err := ioutil.ReadFile("/src/key/ca-cert.pem")
	if err != nil {
		fmt.Println(err)
	}
	if ok := rootCertPool.AppendCertsFromPEM(pem); !ok {
		fmt.Println("Failed to append PEM.")
	}

	return tls.Config{
		ServerName: "codeblock-db-dev.mysql.database.azure.com",
		RootCAs:    rootCertPool,
	}
}
