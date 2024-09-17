import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import styles from './styles/App.module.css';
import Home from './pages/HomePage/HomePage';
import LibraryView from './pages/LibraryViewPage/LibraryViewPage';
import TrailerPage  from './pages/TrailerPage/TrailerPage';
import NotFound from './pages/NotFoundPage/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src="/project-logo.png" alt="Logo" className={styles.appLogo} />
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>Home</Link>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trailers" element={<LibraryView />} />
            <Route path="/trailers/:trailerName" element={<TrailerPage  />} />
            <Route path="*" element={<NotFound />} />
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
