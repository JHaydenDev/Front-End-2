import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class SignUp extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
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
      .post("https://bw-guess-who.herokuapp.com/api/register", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload) ; console.log(res, "this");
        // this.props.history.push("/protected");
        console.log(res)
        var info = res.data;
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

  GoToLogin = () => {
    this.props.setLoginOrRegister("login");
    console.log(this.props.loginOrRegister);
  }

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
          <button>Sign Up</button>
          <br/>
            <button name="register" type="button" onClick={this.GoToLogin}>Click Here to Login</button>
        </form>
      </div>
    );
    } else {
      return (
        <div>You are already logged in as {this.props.loggedInUser.username}</div>
      )
      
    }
  }
}

export default SignUp;