import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default function OldMemory(props) {
  return (
    <Link to="/get"><button>Retrieve a Memory</button></Link>
  );
}
