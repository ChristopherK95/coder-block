import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

interface Job {
  JobId: number;
  Title: string;
  CompanyName: string;
  Region: string;
  Municipality: string;
  Description: string;
  ApplyLink: string;
  Email: string;
  PublishedDate: string;
  LastApplicationDate: string;
  Positions: number;
  Keywords: string[];
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

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job>();

  const fetchData = async () => {
    const data = await axios.post('/api/get-job', id);
    if (data) {
      setJob(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <JobContainer>
        {id}
        {job?.Title}
      </JobContainer>
    </Container>
  );
};

export default JobPage;
