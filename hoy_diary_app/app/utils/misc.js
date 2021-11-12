import AsyncStorage from '@react-native-async-storage/async-storage';

export const APIKEY = 'AIzaSyBd9ijY9CmTNYee_YpoMYtqQRH7FOD6rVc';
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

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
