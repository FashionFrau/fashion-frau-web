import _ from 'lodash'
import * as ActionTypes from '../actions'

export default function(state = {}, action) {
  switch (action.type) {

    case ActionTypes.LOOKS.SUCCESS:
      return _.mapKeys(action.payload.data, function(value, key) {
        return key;
      });

    case ActionTypes.LOOKS.FAILURE:
      return { error: action.message };

    default:
      return state;
  }
}
