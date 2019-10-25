import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class SignUp extends React.Component {
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
      .post("https://bw-guess-who.herokuapp.com/api/register", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload) ; console.log(res, "this");
        // this.props.history.push("/protected");
        var info = res.data;
        this.props.setLoggedInUser({
          id: info.id,
          level: info.level,
          points: info.points,
          username: info.username,
        })
        this.setState({message:``});
      })
      .catch(err => {
        console.log(err.response)
        this.setState({message:`User already exists`});
      });
  };

  GoToLogin = () => {
    this.props.setLoginOrRegister("login");
  }

  render() {
  if(this.props.loggedInUser.username === "") {
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
            <button class="form-button">Sign Up</button>
            <button name="register" type="button" onClick={this.GoToLogin} class="form-button">Click Here to Login</button>
          </div>
        </form>
      </div>
    );
    } else {
      return (
        <div className="welcome-div">
          <p className="welcome-text">You are already logged in as {this.props.loggedInUser.username}.</p>
          <p className="welcome-text">Click Play Game to start your game!</p>
        </div>
      )
      
    }
  }
}

export default SignUp;