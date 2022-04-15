import {
  Company,
  Container,
  Keyword,
  KeywordsContainer,
  Municipality,
  Title,
} from './styles';
import { JobPreviewData } from './types';

interface Props {
  jobPreview: JobPreviewData;
}

const JobPreview = (props: Props) => {
  const { title, companyName, municipality, keywords } = props.jobPreview;

  return (
    <Container>
      <Title>{title}</Title>
      <Company>{companyName}</Company>
      <Municipality>{municipality}</Municipality>
      <KeywordsContainer>
        {keywords.map((k, index) => (
          <Keyword key={index}>{k}</Keyword>
        ))}
      </KeywordsContainer>
    </Container>
  );
};

export default JobPreview;
