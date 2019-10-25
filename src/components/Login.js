import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import SignUp from "./SignUp";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    },
    message: "",
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = (e, credentials) => {
    e.preventDefault();
    // login to retreive the JWT token
    // add the token to localStorage
    // route to /protected (whatever landing page)
    axiosWithAuth()
      // base of '/api/login' inside axiosWithAuth in utils folder
      .post("https://bw-guess-who.herokuapp.com/api/login", credentials)
      .then(res => {
        // localStorage.setItem("token", res.data.payload) ; console.log(res, "this");
        // this.props.history.push("/protected");
        // console.log("wooooooowwwww", res)
        console.log(this.props.loggedInUser);
        console.log(res.data.user);
        var info = res.data.user;
        this.props.setLoggedInUser({
            id: info.id,
            level: info.level,
            points: info.points,
            username: info.username,
        })
        console.log(this.props.loggedInUser);
        this.setState({message:``});
      })
      .catch(err => {
        console.log(err.response);
        this.setState({message:`${err.response.data.message}`});
      });
  };

  GoToRegister = () => {
    this.props.setLoginOrRegister("register");
    console.log(this.props.loginOrRegister);
  }


  render() {
  if(this.props.loggedInUser.username === "" && this.props.loginOrRegister === "login") {
      return (
        <div>
          <form onSubmit={e => this.login(e, this.state.credentials)} className="login-form">
            <div style={{color: "red"}}>{this.state.message}</div>
            <div className="input-div">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.credentials.username}
                onChange={this.handleChange}
                style={{width: "23em", height: "2em", margin: ".2em 0"}}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.credentials.password}
                onChange={this.handleChange}
                style={{width: "23em", height: "2em", margin: ".2em 0"}}
              />
            </div>
            <div className="button-div">
              <button class="form-button">Log In</button>
              <button name="register" type="button" onClick={this.GoToRegister} class="form-button">Click Here to Sign Up</button>
            </div>
            
          </form>
        </div>
      );
    } else if (this.props.loggedInUser.username === "" && this.props.loginOrRegister === "register") {
      return (
        <SignUp loggedInUser={this.props.loggedInUser} setLoggedInUser={this.props.setLoggedInUser} loginOrRegister={this.props.loginOrRegister} setLoginOrRegister={this.props.setLoginOrRegister}/>
      )

    } else {
      console.log("logged in");
      return (
        <div className="welcome-div">
          <p className="welcome-text">Welcome, {this.props.loggedInUser.username}! Thanks for logging in!</p>
          <p className="welcome-text">Click Play Game to start your game!</p>
        </div>
      )
      
    }
  }
}

export default Login;