//import * as actions from './actions';

const initialState = {
  adventures: []
};

export default function journeyReducer(state=initialState, action) {
  switch (action.type) {
        // Fetch Basic Info about User
        case 'SAVE_DATA_SUCCESS': {
            return {
                ...state,
                id: action.response.id,
                nickName: action.response.nickName,
            };
        }
        case 'SAVE_DATA_FAILURE': {
            return {
                ...state,
                id: action.response.id,
                nickName: action.response.nickName,
            };
        }
        default: {
            return state;
        }
    }
}
