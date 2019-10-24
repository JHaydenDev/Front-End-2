import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import { PrivateRoute } from "./components/PrivateRoute";
import Nav from './components/Nav';
import TwitterGame from './components/TwitterGame';
import SignUp from "./components/SignUp"
import Login from './components/Login';


function App() {
	const [loggedInUser, setLoggedInUser] = useState({
		id: 0,
		level: "",
		points: 0,
		username: "",
	})
	const [loginOrRegister, setLoginOrRegister] = useState("login");

	function test(){
		if (loggedInUser.username !== "") {
			return(`This signifies that you have logged in as a user and thus the elements of the page have been updated`);
		}
	}

	return (
		<div className="App">
			{test()}
			<Nav />
<<<<<<< HEAD
			<Route path="/" component={SignUp} />
			<p>or</p>
			<Route path="/" component={Login} />
			<PrivateRoute exact path ="/TwitterGame" component={TwitterGame} />
=======

        <Route path="/" render={props => (<Login {...props} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} loginOrRegister={loginOrRegister} setLoginOrRegister={setLoginOrRegister}/>)} />
			
			<PrivateRoute exact path ="/TwitterGame" component={TwitterGame} />

>>>>>>> 484bbbbef006e8eeb9d2ff59f92035da69c73cbf
		</div>
	);
}

export default App;
