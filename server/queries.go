package main

import "fmt"

func queries() {

	titleSearch := "\"Select JobId, Title, CompanyName, Municipality, PublishedDate, Keywords FROM job WHERE INSTR(Keywords, ?) > 0 LIMIT 100;\", title.Search"

	keywordSearch := "\"Select JobId, Title, CompanyName, Municipality, PublishedDate, Keywords FROM job WHERE INSTR(Keywords, ?) > 0 LIMIT 100;\", municipality.Search"

	municipalitySearch := "\"Select JobId, Title, CompanyName, Municipality, PublishedDate, Keywords FROM job WHERE INSTR(Keywords, ?) > 0 LIMIT 100;\", keywords.Search"

	fmt.Println(titleSearch)
	fmt.Println(keywordSearch)
	fmt.Println(municipalitySearch)

}

var getPageSQL = `SELECT * FROM job WHERE JobId = ?`
