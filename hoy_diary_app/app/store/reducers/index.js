import {combineReducers} from 'redux';
import userReducer from './user_reducer';

const rootReducer = combineReducers({
  User: userReducer,
});

export default rootReducer;
