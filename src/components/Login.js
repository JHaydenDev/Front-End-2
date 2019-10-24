import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {

  state = {
    credentials: {
      username: "",
      password: ""
    },
    loggedInUser: {
      id: 0,
      level: "",
      points: 0,
      username: "Host",
    }
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
      })
      .catch(err => console.log(err.response));
  };

  render() {
    if(this.props.loggedInUser.username === "") {
      return (
        <div>
          <form onSubmit={e => this.login(e, this.state.credentials)}>
            <input
              type="text"
              name="username"
              value={this.state.credentials.username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              value={this.state.credentials.password}
              onChange={this.handleChange}
            />
            <button>Log In</button>
          </form>
        </div>
      );
    } else {
      console.log("logged in");
      return (
        <div>Logged in as {this.props.loggedInUser.username}</div>
      )
      
    }
  }
}

export default Login;