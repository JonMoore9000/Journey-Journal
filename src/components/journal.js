import React from 'react';
import {Router, Route, Link, Redirect, withRouter} from 'react-router-dom';
import Login  from './login';
export default class Journal extends React.Component {
  constructor(props) {
    super(props);
    }

  render() {
  return(
    <div className="container">
    <h3 className="title">Travel Journal</h3>
    <Link to='/register'><button>Sign Up</button></Link>
      <p className="home-info">A journal that allows the user to document their travels and look back and see where they have been.</p>
      <Link to='/login'><button>Login</button></Link>
    </div>
  )}
}
