import React from 'react';
import {Router, Route, Link, Redirect, withRouter} from 'react-router-dom';

export default function GetSearch(props) {
  return(
    <div className="old-info">
    <Link to="/main"><h3 className="title-journey">Travel Journal</h3></Link>
      <h4>Retrieve a Memory</h4>
      <p className="get-info">Look back on an old place you have visited and reminisce.</p>
      <input className="search" type="text" name="search" placeholder="Search" />
    </div>
  );
}
