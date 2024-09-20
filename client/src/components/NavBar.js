import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
    window.location.href = "/homepage";
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
            <div>
              <span>Welcome {user.userName}!</span>
              <Link to="/homepage">HomePage</Link>
              <Link to="/dashboard">My Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
export default NavBar;
