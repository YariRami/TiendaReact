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
        <Link to="/">Home</Link>
        <Link to="/category">Categoria</Link>
        <Link to="/about">Productos</Link>
        <li> 
            <CartWidget/>
        </li>
    </ul>
    </nav>
)
}

export default NavBar
