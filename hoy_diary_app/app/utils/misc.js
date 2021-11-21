import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
import {getDatabase} from 'firebase/database';

export const APIKEY = 'AIzaSyBd9ijY9CmTNYee_YpoMYtqQRH7FOD6rVc';
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

// 사용되는 api 상세 내용
const firebaseConfig = {
  apiKey: 'AIzaSyBd9ijY9CmTNYee_YpoMYtqQRH7FOD6rVc',
  authDomain: 'hoy-diary-app.firebaseapp.com',
  databaseURL:
    'https://hoy-diary-app-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'hoy-diary-app',
  storageBucket: 'hoy-diary-app.appspot.com',
  messagingSenderId: '792594232030',
  appId: '1:792594232030:web:16e80695c19b89ffa3884f',
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const database = getDatabase(firebaseApp);

// export const storage = firebase.storage();
// export const database = firebase.database();

export const setTokens = async (values, callBack) => {
  const firstPair = ['@hoydiary_app@userId', values.userId];
  const secondPair = ['@hoydiary_app@token', values.token];
  const thirdPair = ['@hoydiary_app@refToken', values.refToken];
  try {
    await AsyncStorage.multiSet([firstPair, secondPair, thirdPair]).then(
      response => {
        console.log('set Tokens 실행');
        callBack();
      },
    );
  } catch (e) {
    //save error
  }

  console.log('Done.');
};

// callback 함수 호출 -> 문제 없음.
export const getTokens = async callBack => {
  let values;
  try {
    values = await AsyncStorage.multiGet([
      '@hoydiary_app@userId',
      '@hoydiary_app@token',
      '@hoydiary_app@refToken',
    ]).then(values => {
      callBack(values);
    });
  } catch (e) {
    // read error
  }
  // console.log('get Tokens: ', values);

  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
};
