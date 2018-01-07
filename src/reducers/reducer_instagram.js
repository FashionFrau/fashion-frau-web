import * as ActionTypes from '../actions/instagram'

export default function(state = {}, action) {
  switch (action.type) {
    case ActionTypes.USER_RECENT_MEDIA.SUCCESS:
      return { instagram: action.payload.data }

    case ActionTypes.USER_RECENT_MEDIA.FAILURE:
      return { errorMessage: action.message }

    default:
      return state
  }
}
