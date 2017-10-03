const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const LOOKS = createRequestTypes('LOOKS')
export const LOOK = createRequestTypes('LOOK')

export function fetchLooks() {
  return {
    type: LOOKS.REQUEST
  };
}

export function fetchLook(id) {
  return {
    type: LOOK.REQUEST,
    id: id
  };
}
