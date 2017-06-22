import React from 'react';
import {Router, Route, Link, Redirect, withRouter} from 'react-router-dom';
import { getData } from '../actions';
import { connect } from 'react-redux';

 export class oldMemory extends React.Component {

  oldSearch(e) {
    e.preventDefault();
    this.props.getData()
  }

  render() {

  return(
    <div className="old-info">
    <Link to="/main"><h3 className="title-journey">Travel Journal</h3></Link>
      <h4>Retrieve a Memory</h4>
      <p className="get-info">Look back on an old place you have visited and reminisce.</p>
      <input className="search" type="text" name="search" placeholder="Search" />
      <button onClick={this.oldSearch.bind(this)}>Get</button>
    </div>
  )
}
}

export default connect(null, { getData })(oldMemory)
