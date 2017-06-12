import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { loginUser } from '../actions';
import { connect } from 'react-redux';

export class loginThing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //username: '',
      //password: '',
  }
}

login(e) {
  e.preventDefault();
 const userName = this.username.value;
 const passWord = this.password.value;
 console.log(userName);
 console.log(passWord);
 this.props.loginUser(userName, passWord);
}

render() {
  return(
    <form>
    <h3>Login to start your Journey</h3>
      <input placeholder="username" ref={input => {this.username = input}}></input>
      <input placeholder="password" type="password"ref={input => {this.password = input}}></input>
      <button onClick={this.login.bind(this)}>Login</button>
    </form>
  )
}
}

export default connect(null, { loginUser })(loginThing);
