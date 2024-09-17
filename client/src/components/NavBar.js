import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <Link to="/homepage">HomePage</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">My Dashboard</Link>
        </nav>
      </div>
    </header>
  );
};
export default NavBar;
