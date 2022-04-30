import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JobPage from './JobPage';
import './main.css';
import '../i18n';
import { QueryClient, QueryClientProvider } from 'react-query';

const GlobalStyle = createGlobalStyle`
  *{
    font-family: Epilogue-Regular;
  }
  a{
    color: #48bf5a;
  }
  body {
    margin: 0;
    overflow: hidden;

    & > #root {
      height: 100vh;
    } 
  }
`;

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/stats" element={<></>} />
          <Route path="job/:id" element={<JobPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById('root')
);
