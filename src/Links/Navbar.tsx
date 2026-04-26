import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <Link to="/" className="nav-logo">Bumatay F.</Link>

      <div className="nav-right">
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/project">Projects</NavLink>
        </div>

        <NavLink to="/contact" className="nav-cta">Hire Me? </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
