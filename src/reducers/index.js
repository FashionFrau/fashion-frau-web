import { combineReducers } from 'redux';
import LookReducer from './reducer_look';

const rootReducer = combineReducers({
  looks: LookReducer
});

export default rootReducer;
