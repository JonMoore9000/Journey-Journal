import React from 'react';
import AddMemory from './new-memory';
import OldMemory from './old-memory';
//import AddForm from './add-form';
import Login  from './login';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class Journal extends React.Component {
  constructor(props) {
    super(props);
    }

  render() {
  return(
    <div className="container">
    <Link to='/sign-up'><button>Sign Up</button></Link>
      <p className="home-info">A journal that allows the user to document their travels and look back and see where they have been.</p>
      <Login />
    </div>
  )}
}
