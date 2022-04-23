package main

type Company struct {
	Name               string `json:"name"`
	StreetAddress      string `json:"streetAddress"`
	PostCode           string `json:"postCode"`
	City               string `json:"city"`
	PhoneNumber        string `json:"phoneNumber"`
	WebAddress         string `json:"webAddress"`
	Email              string `json:"email"`
	OrganisationNumber string `json:"organisationNumber"`
}

type Education struct {
	Name     string `json:"name"`
	Required bool   `json:"required"`
}

type Application struct {
	Mail        string `json:"mail"`
	Email       string `json:"email"`
	WebAddress  string `json:"webAddress"`
	Other       string `json:"other"`
	Reference   string `json:"reference"`
	Information string `json:"information"`
}

type Workplace struct {
	Name                 string `json:"name"`
	Street               string `json:"street"`
	PostCode             string `json:"postCode"`
	City                 string `json:"city"`
	UnspecifiedWorkplace bool   `json:"unspecifiedWorkplace"`
	Region               string `json:"region"`
	Country              string `json:"country"`
	Municipality         string `json:"municipality"`
	Longitude            string `json:"longitude"`
	Latitude             string `json:"latitude"`
	ShowMap              bool   `json:"showMap"`
}

type AdPage struct {
	Id                  string        `json:"id"`
	Title               string        `json:"title"`
	Description         string        `json:"description"`
	PublishedDate       string        `json:"publishedDate"`
	Occupation          string        `json:"occupation"`
	Company             Company       `json:"company"`
	Logotype            string        `json:"logotype"`
	Conditions          string        `json:"conditions"`
	SalaryDescription   string        `json:"salaryDescription"`
	SalaryType          string        `json:"salaryType"`
	WorkTimeExtent      string        `json:"workTimeExtent"`
	EmploymentType      string        `json:"employmentType"`
	Duration            string        `json:"duration"`
	LastApplicationDate string        `json:"lastApplicationDate"`
	ExpirationDate      string        `json:"expirationDate"`
	Positions           int           `json:"positions"`
	Published           bool          `json:"published"`
	OwnCar              bool          `json:"ownCar"`
	RequiresExperience  bool          `json:"requiresExperience"`
	Education           Education     `json:"education"`
	Application         Application   `json:"application"`
	Workplace           Workplace     `json:"workplace"`
	DrivingLicense      []interface{} `json:"drivingLicense"`
	Skills              []interface{} `json:"skills"`
	Languages           []interface{} `json:"languages"`
	WorkExperiences     []interface{} `json:"workExperiences"`
	Contacts            []interface{} `json:"contacts"`
}

type ScrapedJob struct {
	JobId               string   `json:"jobId"`
	Title               string   `json:"title"`
	Occupation          string   `json:"occupation"`
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

type Job struct {
	JobId               string `json:"jobId"`
	Title               string `json:"title"`
	Occupation          string `json:"occupation"`
	CompanyName         string `json:"companyName"`
	Region              string `json:"region"`
	Municipality        string `json:"municipality"`
	Description         string `json:"description"`
	ApplyLink           string `json:"applyLink"`
	Email               string `json:"email"`
	PublishedDate       string `json:"publishedDate"`
	LastApplicationDate string `json:"lastApplicationDate"`
	Positions           int    `json:"positions"`
	Keywords            string `json:"keywords"`
}

type JobPreview struct {
	JobId         string `json:"jobId"`
	Title         string `json:"title"`
	Occupation    string `json:"occupation"`
	CompanyName   string `json:"companyName"`
	Municipality  string `json:"municipality"`
	PublishedDate string `json:"publishedDate"`
	Keywords      string `json:"keywords"`
}
