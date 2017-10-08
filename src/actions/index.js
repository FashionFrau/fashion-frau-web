const REQUEST = 'REQUEST'
const DELETE = 'DELETE'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE, DELETE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const LOOKS = createRequestTypes('LOOKS')
export const LOOK = createRequestTypes('LOOK')

export function fetchLooks(urlParams) {
  return {
    type: LOOKS.REQUEST,
    params: urlParams
  };
}

export function fetchLook(id) {
  return {
    type: LOOK.REQUEST,
    id: id
  };
}

export function deleteLook(id) {
  return {
    type: LOOK.DELETE,
    id: id
  }
}
