import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserContentDashboard from "./components/ContentDashboard/ContentDashboard";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UploadTrailer from "./components/UploadTrailer"; 
import LibraryView from './pages/LibraryViewPage/LibraryViewPage';
import TrailerPage  from './pages/TrailerPage';
import NotFound from './pages/NotFoundPage';

function App() {
  const { user } = useAuthContext();
  const [successMessage, setSuccessMessage] = useState(null); // State for success message

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home successMessage={successMessage} /> : <Navigate to="/login" />}
            />
            {/* Pass the setSuccessMessage to the UploadTrailer component */}
            <Route
              path="/upload-trailer"
              element={user ? <UploadTrailer setSuccessMessage={setSuccessMessage} /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
