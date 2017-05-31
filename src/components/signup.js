import React from 'react';
import { connect } from 'react-redux';
import {signUpUser} from '../actions';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
  }
}

render() {
  return(
    <div className="container">
    <form>
    <h3>Sig up to start your making Memories</h3>
      <input placeholder="username" ref={input => {this.username = input}}></input>
      <input placeholder="password" type="password" ref={input => {this.password = input}}></input>
      <button onClick=
      {this.userSignUp.bind(this)}>Sign Up</button>
    </form>
    </div>
  )
}

userSignUp() {
  const userName = this.username.value;
  const passWord = this.password.value;
 this.props.signUpUser(userName, passWord);
}
}
export default connect(null, { signUpUser })(SignUp);
