import {SIGN_IN, SIGN_UP, AUTO_SIGN_IN} from '../types';

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
    case AUTO_SIGN_IN:
      return {
        ...state,
        auth: {
          userId: action.payload.user_id || false,
          token: action.payload.id_token || false,
          refToken: action.payload.refresh_token || false,
        },
      };
    default:
      return state;
  }
}
