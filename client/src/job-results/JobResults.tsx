import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Spinner from '../components/spinner/Spinner';
import JobPreview from '../job-preview/JobPreview';
import JobResult from './JobResult';
import { JobContainer, ResultsContainer } from './styles';
import { JobResultData } from './types';

interface Props {
  jobResults: JobResultData[];
  isLoading: boolean;
}

const JobResults = (props: Props) => {
  const [showJobPreview, setShowJobPreview] = useState<string>('');
  const { jobResults, isLoading } = props;

  const showPreview = async (id: string) => {
    if (showJobPreview !== id) {
      setShowJobPreview(id);
    } else {
      setShowJobPreview('');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!jobResults) {
    return <></>;
  }

  return (
    <JobContainer>
      <ResultsContainer>
        {jobResults.map((j: JobResultData, index) => (
          <JobResult
            key={index}
            JobResult={j}
            showPreview={showPreview}
            showJobPreview={showJobPreview}
          />
        ))}
      </ResultsContainer>
      <AnimatePresence>
        {showJobPreview !== '' && (
          <JobPreview
            id={showJobPreview}
            onClick={() => setShowJobPreview('')}
          />
        )}
      </AnimatePresence>
    </JobContainer>
  );
};

export default JobResults;
