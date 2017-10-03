import _ from 'lodash';
import { LOOKS_FETCH_REQUESTED, LOOKS_FETCH_SUCCEEDED } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case LOOKS_FETCH_SUCCEEDED:
      return _.mapKeys(action.payload.data, function(value, key) {
        return key;
      });
      case LOOKS_FETCH_REQUESTED:
        return state;
    default:
      return state;
  }
}
