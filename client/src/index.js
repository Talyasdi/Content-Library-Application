import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; 
import './styles/index.css'; 
import App from './App';
import { DuckProvider } from './context/DuckContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DuckProvider>
      <App /> 
    </DuckProvider>
  </React.StrictMode>
);
