import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as PersonSvg } from '../svg/person.svg';
import TopBar from '../top-bar/TopBar';
import Keyword from '../job-results/Keyword';
import {
  ApplyContainer,
  ApplyLink,
  Container,
  Desc,
  Email,
  JobContainer,
  JobTitle,
  KeywordsContainer,
  LastApplicationDate,
  Municipality,
  Positions,
  PublishedDate,
  SubTitle,
  TopContainer,
} from './Styles';

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

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job>();

  const fetchData = async () => {
    const res = await axios.post('http://localhost:8000/api/get-job', {
      id: id,
    });

    if (res) {
      setJob(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (job) document.title = job.title;
  }, [job]);

  const date = new Date().getTime();
  const lastDate = new Date(job?.lastApplicationDate + 'Z').getTime();
  let remainingTime = lastDate - date;
  let remainingTimeString = '';

  if (remainingTime > 86400000) {
    //Time in milliseconds = 24 Hours
    remainingTime = remainingTime / (1000 * 3600 * 24);
    remainingTime = Math.round(remainingTime);
    remainingTimeString = remainingTime + ' days left';
  } else {
    remainingTime = remainingTime / (1000 * 3600);
    remainingTime = Math.round(remainingTime);
    remainingTimeString = remainingTime + ' hours left';
  }

  return (
    <>
      <TopBar />
      <Container>
        <JobContainer>
          <TopContainer>
            <JobTitle>{job?.title}</JobTitle>
            <SubTitle>
              {job?.occupation}{' '}
              <Positions>
                {' '}
                <i>
                  <PersonSvg />
                </i>
                {job?.positions}
              </Positions>
            </SubTitle>
            <SubTitle>{job?.companyName}</SubTitle>
            <Municipality>{job?.municipality}</Municipality>
            <KeywordsContainer>
              {job?.keywords?.map((k, index) => (
                <Keyword keyword={k} key={index} />
              ))}
            </KeywordsContainer>
            <Email>{job?.email}</Email>
            <ApplyContainer>
              <ApplyLink>Apply</ApplyLink>
              <PublishedDate>Published: {job?.publishedDate}</PublishedDate>
              <LastApplicationDate>
                Expires: {job?.lastApplicationDate} ({remainingTimeString})
              </LastApplicationDate>
            </ApplyContainer>
          </TopContainer>
          <Desc dangerouslySetInnerHTML={job && { __html: job?.description }} />
        </JobContainer>
      </Container>
    </>
  );
};

export default JobPage;
