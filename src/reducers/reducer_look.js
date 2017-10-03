import _ from 'lodash'
import * as ActionTypes from '../actions'

export default function(state = {}, action) {
  switch (action.type) {

    case ActionTypes.LOOKS.SUCCESS:
      return {
        data: action.payload.data, ...state
      }
    case ActionTypes.LOOKS.FAILURE:
      return { errorMessage: action.message };

    default:
      return state;
  }
}
