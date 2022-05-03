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
  const [page, setPage] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<number>();

  const paramsSet = (): boolean =>
    inputValue === '' &&
    locationValue.length === 0 &&
    keywordValue.length === 0;

  const { data, isLoading, isFetching, refetch, isPreviousData } = useQuery(
    ['jobs', page],
    async () =>
      paramsSet()
        ? await axios.get('http://localhost:8000/api/jobs?page=' + page)
        : await axios.post('http://localhost:8000/api/search?page=' + page, {
            input: inputValue,
            locations: locationValue,
            keywords: keywordValue,
          }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 60000,
    }
  );

  useEffect(() => {
    setJobResults([]);
    // setPages(data.data.)
    console.log(data?.data);
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
