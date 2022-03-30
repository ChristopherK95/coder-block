import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Locations from "./filter-data/locations";
import JobPreview from "./job-preview/JobPreview";
import { JobPreviewData } from "./job-preview/types";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #1c2026;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  padding-top: 10%;
  min-height: 100%;
`;

const Search = styled.div`
  background-color: #1e1d1d;
  padding: 50px 20px 20px 20px;
  border-radius: 5px;
  box-shadow: -6px 6px 3px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 45px;
`;

const SearchBar = styled.input`
  width: 500px;
  height: 60px;
  border-radius: 5px;
  background-color: white;
  border: none;
  font-size: 20px;
  padding: 0 10px;
  box-sizing: border-box;
`;

function App() {
  const [jobPreviews, setJobPreviews] = useState<JobPreviewData[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  // Locations();

  const search = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (inputValue === "") {
      await axios
        .get("http://localhost:8000/api/jobs")
        .then((res) => console.log(res));
    } else {
      await axios
        .post("http://localhost:8000/api/search", { search: inputValue })
        .then((res) => convertJson(res.data));
    }
  };

  const convertJson = (json: JSON) => {
    const arr = JSON.parse(JSON.stringify(json));
    const jobs: JobPreviewData[] = [];
    for (let i = 0; i < arr.length; i++) {
      const jobPreview: JobPreviewData = {
        jobId: arr[i].jobId,
        title: arr[i].title,
        companyName: arr[i].companyName,
        municipality: arr[i].municipality,
        publishedDate: arr[i].publishedDate,
        keywords: collectKeywords(arr[i].keywords),
      };
      jobs.push(jobPreview);
    }
    setJobPreviews(jobs);
  };

  const collectKeywords = (string: string): string[] => {
    const keywords: string[] = [];
    let collectChar: boolean = false;
    let keyword: string = "";
    for (let i = 0; i < string.length; i++) {
      if (collectChar && string.charAt(i) !== "'") {
        keyword += string.charAt(i);
      }
      if (string.charAt(i) === "'") {
        collectChar = !collectChar;
        if (keyword.length > 0) {
          keywords.push(keyword);
          keyword = "";
        }
      }
    }
    return keywords;
  };

  return (
    <Container>
      <Search>
        <form onSubmit={search}>
          <SearchBar
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </form>
      </Search>
      <div style={{ display: "flex", flexDirection: "column", width: "540px" }}>
        {jobPreviews.map((j: JobPreviewData) => (
          <JobPreview jobPreview={j} />
        ))}
      </div>
    </Container>
  );
}

export default App;
