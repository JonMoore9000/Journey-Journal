export const POST_DATA_SUCCESS = 'POST_DATA_SUCCESS';
export const POST_DATA_FAILURE = 'POST_DATA_FAILURE';
export const POST_DATA_TRIGGERED = 'POST_DATA_TRIGGERED';

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

export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_TRIGGERED = 'GET_DATA_TRIGGERED';
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE';

export function getData() {
  const promise = fetch('http://localhost:8080/logs');
    return {
      onRequest: GET_DATA_TRIGGERED,
      onSuccess: GET_DATA_SUCCESS,
      onFailure: GET_DATA_FAILURE,
      promise,
    };
}
