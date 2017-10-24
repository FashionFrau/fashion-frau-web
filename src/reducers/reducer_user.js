import * as ActionTypes from '../actions'

export default function(state = {}, action) {
  switch (action.type) {

    case ActionTypes.LOGIN.SUCCESS:
      return { data: action.payload.data }
    case ActionTypes.LOGIN.FAILURE:
      return { data: action.message }
    default:
      return state
  }
}
