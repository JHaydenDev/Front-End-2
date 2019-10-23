import React from "react";
// import { Router, Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


// Navigation bar components
function Nav() {
    return (
        <Router>
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <li>Start Game</li>
                <button><li>Login/Sign Up</li></button>
            </ul>
        </nav>
        </Router>
    )

}

export default Nav;