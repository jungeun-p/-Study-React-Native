import axios from 'axios';
import {GET_DIARIES} from '../types';

export function getDiaries() {
  const request = axios
    .get(
      `https://hoy-diary-app-default-rtdb.asia-southeast1.firebasedatabase.app/diary.json`,
    )
    .then(response => {
      const diaryData = [];
      for (let key in response.data) {
        // key번째 값이 존재한다면.
        if (response.data[key]) {
          diaryData.push({...response.data[key]});
        }
      }
      return diaryData;
    })
    .catch(error => {
      alert('getFaild');
      return false;
    });
  return {
    type: GET_DIARIES,
    payload: request,
  };
}
