import Keyword from './Keyword';
import { ReactComponent as ArrowSvg } from '../svg/arrow.svg';
import {
  Arrow,
  ArrowContainer,
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
  showJobPreview: string;
}

const JobResult = (props: Props) => {
  const { jobId, title, companyName, municipality, keywords } = props.JobResult;
  const { showJobPreview } = props;

  return (
    <Container>
      <Title>{title}</Title>
      <Company>{companyName}</Company>
      <Municipality>{municipality}</Municipality>
      <KeywordsContainer>
        {keywords?.map((k, index) => (
          <Keyword keyword={k} key={index} />
        ))}
      </KeywordsContainer>
      <ArrowContainer>
        <Arrow
          onClick={() => props.showPreview(jobId)}
          animate={{ rotate: showJobPreview === jobId ? 180 : 0 }}
          transition={{
            type: 'spring',
            stiffness: 150,
            duration: 0.2,
            damping: 12,
          }}
          initial={false}
          expanded={showJobPreview === jobId}
        >
          <ArrowSvg />
        </Arrow>
      </ArrowContainer>
    </Container>
  );
};

export default JobResult;
