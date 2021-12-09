import {combineReducers} from 'redux';
import diaryReducer from './diary_reducer';
import userReducer from './user_reducer';
import newsReducer from './news_reducer';

const rootReducer = combineReducers({
  User: userReducer,
  Diary: diaryReducer,
  News: newsReducer,
});

export default rootReducer;
