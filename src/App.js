import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import TwitterGame from './components/TwitterGame';
import SignUp from "./components/SignUp"
import Login from './components/Login';


function App() {
	return (
		<div className="App">
			<Nav />
			<Route path="/" component={SignUp} />
			<p>or</p>
			<Route path="/" component={Login} />
			<Route path ="/TwitterGame" component={TwitterGame} />


		</div>
	);
}

export default App;
