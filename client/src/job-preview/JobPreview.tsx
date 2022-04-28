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
  Keyword,
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

const JobPreview = (props: { jobPreviewData: Job; onClick: () => void }) => {
  const {
    title,
    occupation,
    companyName,
    municipality,
    description,
    applyLink,
    email,
    publishedDate,
    lastApplicationDate,
    positions,
    keywords,
  } = props.jobPreviewData;

  const date = new Date().getTime();
  const lastDate = new Date(lastApplicationDate + 'Z').getTime();
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
    <Card>
      <UpperContainer>
        <Title>{title}</Title>
        <Occupation>{occupation}</Occupation>
        <Company>{companyName}</Company>
        <Municipality>{municipality}</Municipality>
        <PublishedDate>Published: {publishedDate}</PublishedDate>
        <LastApplicationDate>
          Expires: {lastApplicationDate} ({remainingTimeString})
        </LastApplicationDate>
        <KeywordsContainer>
          {keywords?.map((k, index) => (
            <Keyword key={index}>{k}</Keyword>
          ))}
        </KeywordsContainer>
        <Positions>
          {' '}
          Positions: {positions}
          <i>
            <PersonSvg />
          </i>
        </Positions>
      </UpperContainer>
      <MiddleContainer>
        <Description
          id="test"
          dangerouslySetInnerHTML={{ __html: description }}
        ></Description>
      </MiddleContainer>
      <BottomContainer>
        <Email>{email}</Email>
        <ButtonContainer>
          <CloseButton onClick={props.onClick}>Close</CloseButton>
          {applyLink && <ApplyLink href={applyLink}>Apply</ApplyLink>}
        </ButtonContainer>
      </BottomContainer>
    </Card>
  );
};

export default JobPreview;
