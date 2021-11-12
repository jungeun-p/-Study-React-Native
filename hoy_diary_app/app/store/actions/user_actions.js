import {SIGN_IN, SIGN_UP, AUTO_SIGN_IN} from '../types';
import axios from 'axios';
import {SIGNUP, SIGNIN, REFRESH} from '../../utils/misc';

export const actions = {
  // signIn: data => ({
  //   type: SIGN_IN,
  //   payload: {email: data.email, token: data.password},
  // }),
  // signUp: submittedForm => ({
  //   type: SIGN_UP,
  //   payload: {email: submittedForm.email, token: submittedForm.password},
  // }),
};

// export const signIn = data => ({
//   type: SIGN_IN,
//   payload: {
//     email: data.email,
//     token: data.password,
//   },
// });

export const autoSignIn = refToken => {
  const request = axios({
    method: 'POST',
    url: REFRESH,
    data: `grant_type=refresh_token&refresh_token=${refToken}`,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
  return {
    type: AUTO_SIGN_IN,
    payload: request,
  };
};

export function signIn(data) {
  const request = axios({
    method: 'POST',
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.email,
      returnSecureToken: true,
    },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
  return {
    type: SIGN_IN,
    payload: request,
  };
}

export function signUp(data) {
  const request = axios({
    method: 'POST',
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.email,
      returnSecureToken: true,
    },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
  return {
    type: SIGN_UP,
    payload: request,
  };
  // return {
  //   type: SIGN_UP,
  //   payload: {
  //     email: data.email,
  //     token: data.password,
  //   },
  // };
}
