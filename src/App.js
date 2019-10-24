import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
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
			<Nav />

			<withRouter>
				<Route exact path="/" render={props => (<Login {...props} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} loginOrRegister={loginOrRegister} setLoginOrRegister={setLoginOrRegister}/>) } />
			</withRouter>
			<withRouter>
				<Route exact path ="/TwitterGame" component={TwitterGame} />
			</withRouter>
			

			

		</div>
	);
}

export default App;
