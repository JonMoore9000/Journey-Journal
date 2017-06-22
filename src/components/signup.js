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

handleSubmit(e) {
  e.preventDefault();
  this.userSignUp();
}

render() {
  return(
    <div>
    <form>
    <h3>Sig up to start your making Memories</h3><br></br>
      <input placeholder="username" ref={input => {this.username = input}}></input><br></br>
      <input placeholder="password" type="password" ref={input => {this.password = input}}></input><br></br>
      <button onClick=
      {this.handleSubmit.bind(this)}>Sign Up</button>
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
