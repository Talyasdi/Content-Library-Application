import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserContentDashboard from "./components/ContentDashboard/ContentDashboard";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UploadTrailer from "./components/UploadTrailer"; 
import TrailerPage  from './pages/TrailerPage';
import NotFound from './pages/NotFoundPage';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            {/* Pass the setSuccessMessage to the UploadTrailer component */}
            <Route
              path="/upload-trailer"
              element={user ? <UploadTrailer /> : <Navigate to="/login" />}
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
              path="/forgot-password"
              element={!user ? <ForgotPassword /> : <Navigate to="/" />}
            />
            <Route
              path="/reset-password/:token"
              element={!user ? <ResetPassword /> : <Navigate to="/" />}
            />
            <Route
              path="/dashboard"
              element={
                user ? <UserContentDashboard /> : <Navigate to="/login" />
              }
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
