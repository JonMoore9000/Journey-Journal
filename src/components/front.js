import React from 'react';
import AddMemory from './new-memory';
import OldMemory from './old-memory';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class Front extends React.Component {
  constructor(props) {
    super(props);
    }

  render() {
  return(
      <div className="container">
        <AddMemory />
        <OldMemory />
      </div>
  )}
}
