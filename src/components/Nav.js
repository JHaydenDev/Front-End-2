import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import TwitterIcon from "../images/TwitterIcon.png";


// Navigation bar components
function Nav() {
    return (
        <Router>
        <nav>
            <img src={TwitterIcon} width="50" height="50"/>
            <ul className="nav-links">
                <li>Start Game</li>
                <button className="navbar-button"><li>Login/Sign Up</li></button>
            </ul>
        </nav>
        </Router>
    )

}

export default Nav;