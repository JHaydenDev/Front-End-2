import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import TwitterIcon from "../images/TwitterIcon.png";



// Navigation bar components
function Nav() {
    return (
        <Route>
        <nav>
            <img src={TwitterIcon} width="50" height="50"/>
            <ul className="nav-links">
                <Link to="/Dashboard" className="navbar-button">Dashboard</Link>
                <Link to="/TwitterGame" className="navbar-button">Play Game</Link>
                <Link to="/" className="navbar-button">Login/Signup</Link>
            </ul>
        </nav>
        </Route>
    )
}

export default Nav;