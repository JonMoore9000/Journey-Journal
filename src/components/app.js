import React from 'react';
import {Router, Route, Link, Redirect, withRouter} from 'react-router-dom';
import history from '../history';
import Journal from './journal';
import AddForm from './add-form';
import GetSearch from './old-search';
//import SignUp from './signup';
import Front from './front';
import loginThing from './login';


const AuthExample = () => (
  <Router history={history}>
    <div>
      <ul>
        <li><Link to="/public">Public Page</Link></li>
        <li><Link to="/main">Protected Page</Link></li>
      </ul>
      <Route path="/public" component={Journal}/>
      <Route path="/login" component={loginThing}/>
      <PrivateRoute path="/main" component={Front}/>
    </div>
  </Router>
)

const hasToken = () => {
  const token = sessionStorage.getItem('secret');
  if(token) {
    return true;
  }
  return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    hasToken() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

export default AuthExample
