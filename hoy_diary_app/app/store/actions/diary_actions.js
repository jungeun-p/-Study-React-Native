import {DataSnapshot, onValue} from 'firebase/database';
import {ref} from 'firebase/database';
import {database} from '../../utils/misc';
import {GET_DIARIES} from '../types';

export function getDiaries(User) {
  // auth.onAuthStateChanged(user => {
  //   if (user) {
  //     console.log('user id is...', user);
  //   } else {
  //     console.log('not logged in');
  //   }
  // });

  return dispatch => {
    const url = `diary/${User.auth.userId}`;
    const dbRef = ref(database, url);
    // data 변화를 감지.
    // database에서 데이터 읽는 최선의 방법.
    // callback함수로 snapshot에 데이터가 담긴다. -> 없다면 null
    onValue(dbRef, snapshot => {
      const diaryData = [];
      for (let key in snapshot.val()) {
        if (snapshot.val()[key]) {
          diaryData.push({...snapshot.val()[key]});
        }
      }
      // const data = snapshot.val();
      dispatch({type: GET_DIARIES, payload: diaryData});
    });
  };
  // const request = axios
  //   .get(
  //     `https://hoy-diary-app-default-rtdb.asia-southeast1.firebasedatabase.app/diary.json`,
  //   )
  //   .then(response => {
  //     const diaryData = [];
  //     for (let key in response.data) {
  //       // key번째 값이 존재한다면.
  //       if (response.data[key]) {
  //         diaryData.push({...response.data[key]});
  //       }
  //     }
  //     return diaryData;
  //   })
  //   .catch(error => {
  //     alert('getFaild');
  //     return false;
  //   });
  // return {
  //   type: GET_DIARIES,
  //   payload: request,
  // };
}
