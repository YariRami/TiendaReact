import "./NavBar.css";
import logo from "../../assets/Logo.png";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
      <nav className="NavBar">
        <ul>
        <img src={logo} alt="logo" id="logo" />
        <h1>New Moon Skin</h1>
          <Link className="li" to="/">
            Home
          </Link>
          <Link className="li" to="/about">
            About
          </Link>
          <Link className="li" to="/contact">
            Contact
          </Link>
          <Link className="li" to="/category/men's clothing">
            Ropa de Hombre
          </Link>
          <Link className="li" to="/category/jewelery">
          Joyas
          </Link>
          <Link className="li" to="/category/electronics">
          Electronicos
          </Link>
          <li> 
            <CartWidget/>
        </li>
        </ul>
      </nav>
    );
  };
  
  export default NavBar;