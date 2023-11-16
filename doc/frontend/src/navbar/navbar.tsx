import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"
import './navbar.css'
function NavBar() {
    return (
        <div className="nav-container">
            <div className="nav-logo-container">
                <img className="nav-logo" src={logo}></img>
            </div>
            <div className="element-container">
                <NavLink className="nav-element" to="/" > Crime Data</NavLink>
                <NavLink className="nav-element" to="/demographic_analysis" > Demographic Analysis</NavLink>
                <i className="fa-solid fa-user"></i>
            </div>
        </div>
    )
}

export default NavBar