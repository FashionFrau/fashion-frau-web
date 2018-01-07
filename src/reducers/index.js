import { combineReducers } from 'redux';
import LookReducer from './reducer_look';
import UserReducer from './reducer_user';
import InstagramReducer from './reducer_instagram';

const rootReducer = combineReducers({
  looks: LookReducer,
  user: UserReducer,
  instagram: InstagramReducer
});

export default rootReducer;
