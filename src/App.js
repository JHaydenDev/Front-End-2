import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import './App.css';
import { PrivateRoute } from "./components/PrivateRoute";
import Nav from './components/Nav';
import TwitterGame from './components/TwitterGame';
import SignUp from "./components/SignUp"
import Login from './components/Login';
import UserGames from "./components/UserGames";
import Dashboard from "./components/Dashboard";


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
			<Nav loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />

			<withRouter>
				<Route exact path="/" render={props => (<Login {...props} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} loginOrRegister={loginOrRegister} setLoginOrRegister={setLoginOrRegister}/>) } />
			</withRouter>
			<withRouter>
				<Route exact path ="/TwitterGame" render={props => (<TwitterGame {...props} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />)} />
			</withRouter>
			<Route exact path ="/UserGames" component={UserGames}></Route>
			<Route exact path ="/Dashboard" render={props => (<Dashboard {...props} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>)} />

			

			

		</div>
	);
}

export default App;
