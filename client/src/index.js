import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; 
import "./styles/index.css";
import App from './App';
import { AuthContextProvider } from "./context/AuthContext";
// import { TrailerProvider } from './context/TrailerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      {/* <TrailerProvider> */}
        <App /> 
      {/* </TrailerProvider> */}
    </AuthContextProvider>
  </React.StrictMode>
);