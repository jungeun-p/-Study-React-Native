import {GET_COVID} from '../types';

const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_COVID:
      return {
        ...state,
        news: {
          covid: action.payload,
        },
      };
    default:
      return state;
  }
}
