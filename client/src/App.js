import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserContentDashboard from './components/ContentDashboard/ContentDashboard';
import { useAuthContext } from "./hooks/useAuthContext";

//pages & components
import Home from "./pages/HomePage/HomePage";
import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import LibraryView from './pages/LibraryViewPage/LibraryViewPage';
import TrailerPage  from './pages/TrailerPage/TrailerPage';
import NotFound from './pages/NotFoundPage/NotFound';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/homepage"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/homepage" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/homepage" />}
            />
            <Route
              path="/dashboard"
              element={
                user ? <UserContentDashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/trailers"
              element={user ? <LibraryView /> : <Navigate to="/login" />}
            />
            <Route
              path="/trailers/:id"
              element={user ? <TrailerPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
