import styled from "styled-components";
import { JobPreviewData } from "./types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  color: white;
  font-size: 20px;
  margin: 0;
`;

const Company = styled.h2`
  color: white;
  margin: 0;
`;

const Municipality = styled.h2`
  color: #b6b6b6;
  margin: 0;
`;

const KeywordsContainer = styled.div`
  display: flex;
`;

const Keyword = styled.p`
  color: white;
  margin: 0 10px 0 0;
`;

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
        {keywords.map((k) => (
          <Keyword>{k}</Keyword>
        ))}
      </KeywordsContainer>
    </Container>
  );
};

export default JobPreview;
