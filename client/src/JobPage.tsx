import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #333537;
  background: linear-gradient(to right, #cb1d90, #bf342a, #e87a14);
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  padding-top: 10%;
  min-height: 100%;
`;

const JobContainer = styled.div`
  width: 1200px;
  min-height: 800px;
  background-color: #333537;
  border-radius: 8px;
  box-shadow: -6px 6px 3px 3px rgba(0, 0, 0, 0.3);
`;

const JobTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin: 15px 0 10px 20px;
`;

const SubTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #dfdfdf;
  margin: 0 0 0 20px;
`;

const Desc = styled.p`
  color: white;
  font-size: 16px;
  margin: 40px 150px;
  white-space: break-spaces;
`;

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

  return (
    <Container>
      <JobContainer>
        <JobTitle>{job?.title}</JobTitle>
        <SubTitle>{job?.occupation}</SubTitle>
        <SubTitle>{job?.companyName}</SubTitle>
        <Desc>{job?.description}</Desc>
      </JobContainer>
    </Container>
  );
};

export default JobPage;
