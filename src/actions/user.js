import history from '../history';

export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_TRIGGERED = 'FETCH_LOGIN_TRIGGERED';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';

const mainPage = (response, dispatch) => {
  sessionStorage.removeItem('secret', response.token);
  sessionStorage.setItem('secret', response.token);
    history.push('/main');
    dispatch({
        type: FETCH_LOGIN_SUCCESS,
        response,
    });
};

export function loginUser(username1, password1) {
  const promise = fetch('http://localhost:8080/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username1,
      password: password1,
    }),
  });
  return {
        onRequest: FETCH_LOGIN_TRIGGERED,
        onSuccess: mainPage,
        onFailure: FETCH_LOGIN_FAILURE,
        promise,
    };
}

export const POST_SIGNUP_SUCCESS = 'POST_DATA_FAILURE';
export const POST_SIGNUP_TRIGGERED = 'POST_DATA_TRIGGERED';
export const POST_SIGNUP_FAILURE = 'POST_DATA_FAILURE';

const loginPage = (response, dispatch) => {
    history.push('/login');
    dispatch({
        type: POST_SIGNUP_SUCCESS,
        response,
    });
};

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
        onRequest: POST_SIGNUP_TRIGGERED,
        onSuccess: loginPage,
        onFailure: POST_SIGNUP_FAILURE,
        promise,
    };
}
