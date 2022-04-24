import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import JobPreview from './job-preview/JobPreview';
import { JobPreviewData } from './job-preview/types';
import Search from './search/Search';
import TopBar from './top-bar/TopBar';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #333537;
  background: linear-gradient(to right, #cb1d90, #bf342a, #e87a14);
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  min-height: 100%;
`;

function App() {
  const [jobPreviews, setJobPreviews] = useState<JobPreviewData[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [keywordValue, setKeywordValue] = useState<string[]>([]);
  const [locationValue, setLocationValue] = useState<string[]>([]);

  const addKeyword = (keyword: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (keywordValue.includes(keyword)) {
      setKeywordValue(keywordValue.filter((k) => k !== keyword));
    } else {
      setKeywordValue([...keywordValue, keyword]);
    }
  };

  const addLocation = (location: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (locationValue.includes(location)) {
      setLocationValue(locationValue.filter((k) => k !== location));
    } else {
      setLocationValue([...locationValue, location]);
    }
  };

  const search = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      inputValue === '' &&
      locationValue.length === 0 &&
      keywordValue.length === 0
    ) {
      await axios
        .get('http://localhost:8000/api/jobs')
        .then((res) => convertJson(res.data));
    } else {
      await axios
        .post('http://localhost:8000/api/search', {
          input: inputValue,
          locations: locationValue,
          keywords: keywordValue,
        })
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
        keywords: arr[i].keywords,
        // keywords: collectKeywords(arr[i].keywords),
      };
      jobs.push(jobPreview);
    }
    setJobPreviews(jobs);
  };

  return (
    <Container>
      <TopBar />
      <Search
        inputValue={inputValue}
        setInputValue={setInputValue}
        search={search}
        keywordValue={keywordValue}
        setKeywordValue={addKeyword}
        locationValue={locationValue}
        setLocationValue={addLocation}
      />
      <div style={{ display: 'flex', flexDirection: 'column', width: '540px' }}>
        {jobPreviews.map((j: JobPreviewData, index) => (
          <JobPreview key={index} jobPreview={j} />
        ))}
      </div>
    </Container>
  );
}

export default App;
