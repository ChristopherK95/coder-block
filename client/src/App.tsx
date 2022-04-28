import { useRef, useState } from 'react';
import axios from 'axios';
import JobResult from './job-results/JobResults';
import { JobResultData } from './job-results/types';
import Search from './search/Search';
import TopBar from './top-bar/TopBar';
import JobPreview from './job-preview/JobPreview';
import {
  Container,
  Content,
  JobContainer,
  Align,
  ResultsContainer,
} from './styles/Styles';
import { AnimatePresence } from 'framer-motion';

interface Job {
  jobId: number;
  title: string;
  occupation: string;
  companyName: string;
  region: string;
  municipality: string;
  description: string;
  applyLink: string;
  email: string;
  publishedDate: string;
  lastApplicationDate: string;
  positions: number;
  keywords: string[];
}

function App() {
  const [jobResults, setJobResults] = useState<JobResultData[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [keywordValue, setKeywordValue] = useState<string[]>([]);
  const [locationValue, setLocationValue] = useState<string[]>([]);
  const [showJobPreview, setShowJobPreview] = useState<string>('');
  const [jobPreviewData, setJobPreviewData] = useState<Job>();
  const cardRef = useRef<HTMLDivElement>(null);

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
    const jobs: JobResultData[] = [];
    for (let i = 0; i < arr.length; i++) {
      const jobPreview: JobResultData = {
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
    setJobResults(jobs);
  };

  const showPreview = async (id: string) => {
    if (showJobPreview !== id) {
      const res = await axios.post('http://localhost:8000/api/get-job', {
        id: id,
      });
      setJobPreviewData(res.data);
      setShowJobPreview(id);
    } else {
      setShowJobPreview('');
    }
  };

  return (
    <Container>
      <TopBar />
      <Content ref={cardRef}>
        <Align>
          <Search
            inputValue={inputValue}
            setInputValue={setInputValue}
            search={search}
            keywordValue={keywordValue}
            setKeywordValue={addKeyword}
            locationValue={locationValue}
            setLocationValue={addLocation}
          />
          <JobContainer>
            <ResultsContainer>
              {jobResults.map((j: JobResultData, index) => (
                <JobResult
                  key={index}
                  JobResult={j}
                  showPreview={showPreview}
                  showJobPreview={showJobPreview}
                />
              ))}
            </ResultsContainer>
            <AnimatePresence>
              {showJobPreview !== '' && jobPreviewData && (
                <JobPreview
                  jobPreviewData={jobPreviewData}
                  onClick={() => setShowJobPreview('')}
                />
              )}
            </AnimatePresence>
          </JobContainer>
        </Align>
      </Content>
    </Container>
  );
}

export default App;
