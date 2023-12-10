import "./NavBar.css";
import logo from "../../assets/Logo.png";
import CartWidget from "../CartWidget/CartWidget";

const NavBar = () => {
    return (
    <nav className="NavBar">
        <ul>
        <img src={logo} alt="logo" id="logo" />
        <li>Home</li>
        <li>Contacto</li>
        <li>Productos</li>
        <li> 
            <CartWidget/>
        </li>
    </ul>
    </nav>
)
}

export default NavBar
