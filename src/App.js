import React, {useState} from 'react';
import './App.css';
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

	function test(){
		if (loggedInUser.username !== "") {
			return(`This function signifies that you have logged in as a user and thus the elements of the page have been updated`);
		}
	}

	return (
		<div className="App">
			{test()}
			<Nav />
			<Login loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>


		</div>
	);
}

export default App;
