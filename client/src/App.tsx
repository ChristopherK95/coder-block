import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { JobResultData } from './job-results/types';
import Search from './search/Search';
import TopBar from './top-bar/TopBar';
import { Container, Content, Align } from './styles/Styles';
import { useQuery } from 'react-query';
import JobResults from './job-results/JobResults';

function App() {
  const [jobResults, setJobResults] = useState<JobResultData[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [keywordValue, setKeywordValue] = useState<string[]>([]);
  const [locationValue, setLocationValue] = useState<string[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const paramsSet = (): boolean =>
    inputValue === '' &&
    locationValue.length === 0 &&
    keywordValue.length === 0;

  const { data, isLoading, isFetching, refetch } = useQuery(
    'jobs',
    async () =>
      paramsSet()
        ? await axios.get('http://localhost:8000/api/jobs')
        : await axios.post('http://localhost:8000/api/search', {
            input: inputValue,
            locations: locationValue,
            keywords: keywordValue,
          }),
    { enabled: false, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    setJobResults([]);
  }, [data]);

  useEffect(() => {
    if (data) setJobResults(data.data);
  }, [jobResults]);

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
    refetch();
  };

  const scrollToTop = () => {
    cardRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <TopBar scroll={scrollToTop} />
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
          <JobResults
            jobResults={jobResults}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </Align>
      </Content>
    </Container>
  );
}

export default App;
