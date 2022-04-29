import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner/Spinner';
import Keyword from '../job-results/Keyword';
import { ReactComponent as PersonSvg } from '../svg/person.svg';

import {
  ApplyLink,
  BottomContainer,
  ButtonContainer,
  Card,
  CloseButton,
  Company,
  Description,
  Email,
  KeywordsContainer,
  LastApplicationDate,
  MiddleContainer,
  Municipality,
  Occupation,
  Positions,
  PublishedDate,
  Title,
  UpperContainer,
} from './styles';

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

const JobPreview = (props: { id: string; onClick: () => void }) => {
  const [jobPreviewData, setJobPreviewData] = useState<Job>();
  const { data, isLoading, refetch } = useQuery(
    'jobPreview',
    async () =>
      await axios.post('http://localhost:8000/api/get-job', {
        id: props.id,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      setJobPreviewData(data.data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [props.id]);

  const date = new Date().getTime();
  const lastDate = new Date(
    jobPreviewData?.lastApplicationDate + 'Z'
  ).getTime();
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
    <Card
      initial={{ translateX: '-500px', opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: '-500px', opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 150,
        duration: 0.2,
        damping: 12,
      }}
    >
      {!isLoading && jobPreviewData ? (
        <>
          <UpperContainer>
            <Title>{jobPreviewData.title}</Title>
            <Occupation>{jobPreviewData.occupation}</Occupation>
            <Company>{jobPreviewData.companyName}</Company>
            <Municipality>{jobPreviewData.municipality}</Municipality>
            <PublishedDate>
              Published: {jobPreviewData.publishedDate}
            </PublishedDate>
            <LastApplicationDate>
              Expires: {jobPreviewData.lastApplicationDate} (
              {remainingTimeString})
            </LastApplicationDate>
            <KeywordsContainer>
              {jobPreviewData.keywords?.map((k, index) => (
                <Keyword keyword={k} key={index} />
              ))}
            </KeywordsContainer>
            <Positions>
              {' '}
              Positions: {jobPreviewData.positions}
              <i>
                <PersonSvg />
              </i>
            </Positions>
          </UpperContainer>
          <MiddleContainer>
            <Description
              id="test"
              dangerouslySetInnerHTML={{ __html: jobPreviewData.description }}
            ></Description>
          </MiddleContainer>
          <BottomContainer>
            <Email>{jobPreviewData.email}</Email>
            <ButtonContainer>
              <CloseButton onClick={props.onClick}>Close</CloseButton>
              {jobPreviewData.applyLink && (
                <ApplyLink href={jobPreviewData.applyLink}>Apply</ApplyLink>
              )}
            </ButtonContainer>
          </BottomContainer>
        </>
      ) : (
        <Spinner />
      )}
    </Card>
  );
};

export default JobPreview;
