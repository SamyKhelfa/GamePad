import { Link } from "react-router-dom";
import logo from "../img/image.png";
import "../css/header.css";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const Header = () => (
  <header>
    <nav className="nav">
      <ul className="nav-list">
        <li>
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-header" />
            </Link>
        </li>

        <li className="userbuttons">
          {token && (
            <Link className="user" to="/account">
              {user}
            </Link>
          )}
          <Link to="/my-collection">My Collection</Link>
          {token ? (
            <Link to="/logout" className="button-link">
              Logout
            </Link>
          ) : (
            <Link to="/login" className="button-link">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
