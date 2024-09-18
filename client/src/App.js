import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserContentDashboard from './components/ContentDashboard/ContentDashboard';
//pages & components
import Home from './pages/HomePage/HomePage';
import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/homepage" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<UserContentDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  ); }

export default App;
