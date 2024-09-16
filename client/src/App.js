import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
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
        <Link to="/dashboard">
        <button className={styles.dashboardButton}>My Dashboard</button>
        </Link>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/dashboard" element={<UserContentDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  ); }

// function App() {
//   return (
//     <BrowserRouter>
//       <div className={styles.app}>
//         <header className={styles.appHeader}>
//           <img src="/project-logo.png" alt="Logo" className={styles.appLogo} />
//           <nav className={styles.appNav}>
//             <Link to="/" className={styles.appLink}>Home</Link>
//             <Link to="/dashboard">
//           <button className={styles.dashboardButton}>My Dashboard</button>
//           </Link>
//           </nav>
//         </header>
//         <main className={styles.main}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/dashboard" element={<UserContentDashboard />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

export default App;
