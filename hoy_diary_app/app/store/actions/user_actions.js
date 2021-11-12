import {SIGN_IN, SIGN_UP} from '../types';
import axios from 'axios';
import {SIGNUP, SIGNIN} from '../../utils/misc';

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
