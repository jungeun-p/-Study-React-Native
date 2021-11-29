import {SIGN_IN, SIGN_UP, AUTO_SIGN_IN} from '../types';
import axios from 'axios';
import {SIGNUP, SIGNIN, REFRESH, auth} from '../../utils/misc';
import {signInWithEmailAndPassword} from '@firebase/auth';

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

// const firebaseLogin = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password).then(
//       userCredential => {
//         let user = userCredential.user;
//         return user;
//       },
//       console.log(user),
//     );
//   } catch (e) {
//     console.warn(e.message);
//   }
// };
const firebaseLogin = data => {
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then(userCredential => {
      console.log(userCredential.user);
      return userCredential.user;
    })
    .catch(error => {
      console.log(error.message);
    });
};

export function signIn(data) {
  firebaseLogin(data);
  const request = axios({
    method: 'POST',
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
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
      password: data.password,
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
