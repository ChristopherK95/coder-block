export interface JobResultData {
  jobId: string;
  title: string;
  companyName: string;
  municipality: string;
  publishedDate: string;
  keywords: string[];
}

export interface Job {
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
