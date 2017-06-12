import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { push } from 'react-router-redux';
import history from './history';

//import Endpoint from '../../config'

export const SAVE_DATA = 'SAVE_DATA';
export const POST_DATA_SUCCESS = 'POST_DATA_SUCCESS';
export const POST_DATA_FAILURE = 'POST_DATA_FAILURE';
export const POST_DATA_TRIGGERED = 'POST_DATA_TRIGGERED';

const saveSuccess = () => {
    const yay = "Your journey is saved!";

};

export function saveData(thePlace, theDate, theNotes) {
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

export function loginUser(username1, password1) {
  isAuthenticated: true;
  const mainPage = (response, dispatch) => {
      if(true) {
        history.push('/main');
      }
      dispatch({
          type: POST_DATA_SUCCESS,
          response,
      });
  };
  const promise = fetch('http://localhost:8080/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(username1 + ":" + password1),
    },
    body: JSON.stringify({
      username: username1,
      password: password1,
    }),
    auth_token: 'secret'
  });
  return {
        onRequest: POST_DATA_TRIGGERED,
        onSuccess: mainPage,
        onFailure: POST_DATA_FAILURE,
        promise,
    };
}

export function savePlace(thePlace, theDate, theNotes) {
  console.log(thePlace, theDate, theNotes);
  return {type: 'SAVE_PLACE'}
}
