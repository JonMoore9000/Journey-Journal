import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
  }
}

render() {
  return(
    <form>
    <h3>Login to start your Journey</h3>
      <input placeholder="username" ref={input => {this.username = input}}></input>
      <input placeholder="password" type="password"ref={input => {this.password = input}}></input>
      <button>Login</button>
    </form>
  )
}

userHandle() {
 const userName = this.username.value;
 const passWord = this.password.value;
 this.props.userLogin(userName, passWord);
}

}
