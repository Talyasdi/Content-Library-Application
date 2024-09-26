import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to close the menu after an action
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <div className="container">
        <nav>
          {!user && (
            <div>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
          {user && (
            <div className="user-menu">
              <span className="menu-icon" onClick={toggleMenu}>&#9776;</span>
              <span className="user-menu">
                Welcome {user.userName}! 👋
              </span>
              {menuOpen && (
                <div className="dropdown-menu">
                  <Link to="/" onClick={closeMenu}>HomePage</Link>
                  <Link to="/dashboard" onClick={closeMenu}>My Dashboard</Link>
                  <button className="logout-btn" onClick={() => { handleLogout(); closeMenu(); }}><i class="fas fa-sign-out-alt"></i>Logout</button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
