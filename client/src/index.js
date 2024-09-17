import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; 
import "./styles/index.css";
import App from './App';
import { TrailerProvider } from './context/TrailerContext';
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TrailerProvider>
        <App /> 
      </TrailerProvider>
    </AuthContextProvider>
  </React.StrictMode>
);