import { combineReducers } from 'redux';
import LookReducer from './reducer_look';
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
  looks: LookReducer,
  user: UserReducer
});

export default rootReducer;
