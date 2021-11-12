import {SIGN_IN, SIGN_UP} from '../types';

const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        auth: {
          userId: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false,
        },
      };
    case SIGN_UP:
      return {
        ...state,
        auth: {
          userId: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false,
          // email: action.payload.email || false,
          // token: action.payload.token || false,
        },
      };
    default:
      return state;
  }
}
