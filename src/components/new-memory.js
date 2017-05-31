import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class AddMemory extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        editing: false
      }
  }

  render() {
      return (
        <Link to="/add"><button>Make a Memory</button></Link>
      );
  }
}
