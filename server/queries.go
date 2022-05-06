package main

var getPageSQL = `SELECT * FROM job WHERE JobId = ?`
var getKeywordsSQL = `SELECT Label FROM keywords WHERE JobId = ?`

func totalRowsSQL(input string, locations []string, keywords []string) string {
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
			sql += " AND Municipality = ?"
		}
	}

	for i := 0; i < len(keywords); i++ {
		if i == 0 && input == "" && len(locations) == 0 {
			sql += " WHERE EXISTS (SELECT JobId FROM keywords WHERE Label = ? and job.JobId = keywords.JobId) "
		} else {
			sql += " AND EXISTS (SELECT JobId FROM keywords WHERE Label = ? and job.JobId = keywords.JobId) "
		}
	}

	return sql
}
