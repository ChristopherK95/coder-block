import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { JobResultData } from './job-results/types';
import Search from './search/Search';
import TopBar from './top-bar/TopBar';
import { Container, Content, Align, JobCounter } from './styles/Styles';
import { useQuery } from 'react-query';
import JobResults from './job-results/JobResults';
import { ReactQueryDevtools } from 'react-query/devtools';
import Pagination from './components/pagination/Pagination';

function App() {
  const [jobResults, setJobResults] = useState<JobResultData[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [keywordValue, setKeywordValue] = useState<string[]>([]);
  const [locationValue, setLocationValue] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<number>();
  const [nJobs, setNJobs] = useState<number>(0);

  const paramsSet = (): boolean =>
    inputValue === '' &&
    locationValue.length === 0 &&
    keywordValue.length === 0;

  const { data, isLoading, isFetching, refetch } = useQuery(
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
  }, [data]);

  useEffect(() => {
    if (data) {
      setJobResults(data.data.jobs);
      setPages(data.data.pages);
      setNJobs(data.data.numberofJobs);
    }
  }, [jobResults]);

  useEffect(() => {
    if (nJobs === 0) return;
    refetch();
  }, [page]);

  const addKeyword = (keyword: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!keyword) {
      setKeywordValue([]);
      return;
    }

    if (keywordValue.includes(keyword)) {
      setKeywordValue(keywordValue.filter((k) => k !== keyword));
    } else {
      setKeywordValue([...keywordValue, keyword]);
    }
  };

  const addLocation = (location: string | string[], e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (typeof location !== 'string' && location[0] === 'remove') {
      const arr = location.filter((l) => locationValue.includes(l));
      const arrRemoved = locationValue.filter((i) => !arr.includes(i));
      setLocationValue(arrRemoved);
      return;
    }
    if (!location) {
      setLocationValue([]);
      return;
    }
    if (typeof location === 'string') {
      if (locationValue.includes(location)) {
        setLocationValue(locationValue.filter((k) => k !== location));
      } else {
        setLocationValue([...locationValue, location]);
      }
    } else {
      const arr = location.filter((l) => !locationValue.includes(l));
      setLocationValue([...locationValue, ...arr]);
    }
  };

  const search = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setPage(0);
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

          {nJobs && (
            <JobCounter>
              <span>
                Showing {page * 50} -{' '}
                {page + 1 !== pages ? (page + 1) * 50 : nJobs} of
              </span>{' '}
              {nJobs} <span>jobs</span>
            </JobCounter>
          )}

          <JobResults
            jobResults={jobResults}
            isLoading={isLoading}
            isFetching={isFetching}
          />

          {pages && (
            <Pagination currentPage={page} pages={pages} setPage={setPage} />
          )}
        </Align>
      </Content>
      <ReactQueryDevtools />
    </Container>
  );
}

export default App;
