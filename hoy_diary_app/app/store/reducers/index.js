import {combineReducers} from 'redux';
import diaryReducer from './diary_reducer';
import userReducer from './user_reducer';

const rootReducer = combineReducers({
  User: userReducer,
  Diary: diaryReducer,
});

export default rootReducer;
