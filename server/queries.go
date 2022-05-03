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
var getKeywordsSQL = `SELECT Label FROM keywords WHERE JobId = ?`

func totalRowsSQL(input string, locations []string, keywords []string) {
	var sql = `SELECT COUNT(JobId) FROM job`
	if input != "" {
		sql += " WHERE INSTR(Title, ?)"
	}
	for i := 0; i < len(locations); i++ {
		if i != 0 {
			sql += " OR Municipality = ?"
			continue
		}
		if input == "" {
			sql += " WHERE Municipality = ?"
		} else {
			sql += " OR Municipality = ?"
		}
	}
}
