import React from 'react';

export default function GetSearch(props) {
  return(
    <div className="old-info">
      <h4>Retrieve a Memory</h4>
      <p className="get-info">Look back on an old place you have visited and reminisce.</p>
      <input className="search" type="text" name="search" placeholder="Search" />
    </div>
  );
}
