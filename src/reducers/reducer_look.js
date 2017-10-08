import * as ActionTypes from '../actions'

export default function(state = {}, action) {
  switch (action.type) {

    case ActionTypes.LOOK.SUCCESS:
      return { data: action.payload.data }

    case ActionTypes.LOOKS.SUCCESS:
      return { totalCount: action.payload.headers['x-total-count'], data: action.payload.data }

    case ActionTypes.LOOKS.FAILURE:
      return { errorMessage: action.message }

    default:
      return state
  }
}
