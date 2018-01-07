const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const USER_RECENT_MEDIA = createRequestTypes('USER_RECENT_MEDIA')

// =============================================================================
export function getRecentMedia(urlParams) {
  return {
    type: USER_RECENT_MEDIA.REQUEST,
    params: urlParams
  };
}
