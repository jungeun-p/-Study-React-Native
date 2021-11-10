import AsyncStorage from '@react-native-async-storage/async-storage';

export const APIKEY = 'AIzaSyBd9ijY9CmTNYee_YpoMYtqQRH7FOD6rVc';
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
