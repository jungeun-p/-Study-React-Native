import {GET_COVID, GET_DUST} from '../types';

const INITIAL_STATE = {
  covid: null,
  dust: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_COVID:
      return {
        ...state,
        covid: action.payload,
      };
    case GET_DUST:
      return {
        ...state,
        dust: action.payload,
      };
    default:
      return state;
  }
}
