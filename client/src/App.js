import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import UserContentDashboard from './components/ContentDashboard/ContentDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src="/project-logo.png" alt="Logo" className={styles.appLogo} />
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>Home</Link>
            <Link to="/dashboard">
          <button className={styles.dashboardButton}>My Dashboard</button>
          </Link>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<UserContentDashboard />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2024 My App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
