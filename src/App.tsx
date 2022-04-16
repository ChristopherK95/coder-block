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

  const search = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (inputValue === '') {
      await axios
        .get('http://localhost:8000/api/jobs')
        .then((res) => convertJson(res.data));
    } else {
      await axios
        .post('http://localhost:8000/api/search', {
          search: inputValue,
          location: 'stockholm',
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
        keywords: collectKeywords(arr[i].keywords),
      };
      jobs.push(jobPreview);
    }
    setJobPreviews(jobs);
  };

  const collectKeywords = (string: string): string[] => {
    const keywords: string[] = [];
    let collectChar: boolean = false;
    let keyword: string = '';
    for (let i = 0; i < string.length; i++) {
      // eslint-disable-next-line quotes
      if (collectChar && string.charAt(i) !== "'") {
        keyword += string.charAt(i);
      }
      // eslint-disable-next-line quotes
      if (string.charAt(i) === "'") {
        collectChar = !collectChar;
        if (keyword.length > 0) {
          keywords.push(keyword);
          keyword = '';
        }
      }
    }
    return keywords;
  };

  return (
    <Container>
      <TopBar />
      <Search
        inputValue={inputValue}
        setInputValue={setInputValue}
        search={search}
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
