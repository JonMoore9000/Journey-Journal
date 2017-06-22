import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Link} from 'react-router-dom';
import { loginUser } from '../actions';
import { connect } from 'react-redux';

const hasToken = () => {
  const token = sessionStorage.getItem('secret');
  if(token) {
    return true;
  }
  return false;
}

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

  if(hasToken()) {
    return (<Redirect to={{
      pathname: '/main',
      state: { from: this.props.location }
    }}/>)
  }
  else {

  return(
    <form>
    <h3>Login to start your Journey</h3><br></br>
      <input placeholder="username" ref={input => {this.username = input}}></input><br></br>
      <input placeholder="password" type="password"ref={input => {this.password = input}}></input><br></br>
      <button onClick={this.login.bind(this)}>Login</button>
    </form>
  )}
}
}

export default connect(null, { loginUser })(loginThing)
