import React from 'react';
//import Endpoint from '../../config'

export const SAVE_DATA = 'SAVE_DATA';
export const POST_DATA_SUCCESS = 'POST_DATA_SUCCESS';
export const POST_DATA_FAILURE = 'POST_DATA_FAILURE';
export const POST_DATA_TRIGGERED = 'POST_DATA_TRIGGERED';

export function saveData(thePlace, theDate, theNotes) {
  // need to have a response if succeed and error if not
  //console.log(rest);
  //3000
  //config file with endpoints
  const promise = fetch('http://localhost:8080/logs', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      place: thePlace,
      date: theDate,
      notes: theNotes
    })
  });
  return {
        onRequest: POST_DATA_TRIGGERED,
        onSuccess: POST_DATA_SUCCESS,
        onFailure: POST_DATA_FAILURE,
        promise,
    };
}

export function signUpUser(username1, password1) {
  const promise = fetch('http://localhost:8080/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username1,
      password: password1,
    })
  });
  return {
        onRequest: POST_DATA_TRIGGERED,
        onSuccess: POST_DATA_SUCCESS,
        onFailure: POST_DATA_FAILURE,
        promise,
    };
}

export function savePlace(thePlace, theDate, theNotes) {
  console.log(thePlace, theDate, theNotes);
  return {type: 'SAVE_PLACE'}
}
