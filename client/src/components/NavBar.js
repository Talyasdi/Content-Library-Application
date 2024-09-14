import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <Link to="/signup">Signup</Link>
        </nav>
      </div>
    </header>
  );
};
export default NavBar;
