import Keyword from './Keyword';
import {
  Company,
  Container,
  KeywordsContainer,
  Municipality,
  Title,
} from './styles';
import { JobResultData } from './types';

interface Props {
  JobResult: JobResultData;
  showPreview: (jobId: string) => void;
}

const JobResult = (props: Props) => {
  const { jobId, title, companyName, municipality, keywords } = props.JobResult;

  return (
    <Container onClick={() => props.showPreview(jobId)}>
      <Title>{title}</Title>
      <Company>{companyName}</Company>
      <Municipality>{municipality}</Municipality>
      <KeywordsContainer>
        {keywords?.map((k, index) => (
          <Keyword keyword={k} key={index} />
        ))}
      </KeywordsContainer>
    </Container>
  );
};

export default JobResult;
