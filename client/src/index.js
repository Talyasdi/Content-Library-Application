import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; 
import App from './App';
import { TrailersProvider } from './context/TrailersContext';
import { TrailerProvider } from './context/TrailerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <TrailersProvider> */}
      <TrailerProvider>
        <App /> 
      </TrailerProvider>
    {/* </TrailersProvider> */}
  </React.StrictMode>
);
