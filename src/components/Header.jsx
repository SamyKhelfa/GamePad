import { Link } from "react-router-dom";
import logo from "../img/image.png";
import "../css/header.css";
const token = localStorage.getItem("token");

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <div className="header-buttons">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-header" />
            </Link>
          </div>
        </li>
        <div className="userbuttons">
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
        </div>
      </ul>
    </nav>
  </header>
);

export default Header;
