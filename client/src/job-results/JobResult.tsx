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
import { Link } from 'react-router-dom';

interface Props {
  JobResult: JobResultData;
  showPreview: (jobId: string) => void;
  showJobPreview: string;
  delay: number;
}

const JobResult = (props: Props) => {
  const { jobId, title, companyName, municipality, keywords } = props.JobResult;
  const { showJobPreview, delay } = props;

  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: delay * 0.1,
        ease: 'easeOut',
      }}
    >
      <Title>
        <Link to={`/job/${jobId}`}>{title}</Link>
      </Title>
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
