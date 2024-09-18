import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import LibraryView from './pages/LibraryViewPage/LibraryViewPage';
import TrailerPage  from './pages/TrailerPage/TrailerPage';
import NotFound from './pages/NotFoundPage/NotFound';
// import styles from './styles/App.module.css';
import UserContentDashboard from './components/ContentDashboard/ContentDashboard';
//pages & components
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
            <Route path="/trailers" element={<LibraryView />} />
            <Route path="/trailers/:trailerName" element={<TrailerPage  />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  ); }

export default App;
