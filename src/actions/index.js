const REQUEST = 'REQUEST'
const CREATE = 'CREATE'
const DELETE = 'DELETE'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, CREATE, SUCCESS, FAILURE, DELETE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const LOGIN = createRequestTypes('LOGIN')
export const LOGOUT = createRequestTypes('LOGOUT')

export const LOOKS = createRequestTypes('LOOKS')
export const LOOK = createRequestTypes('LOOK')

export function authenticate(code) {
  return {
    type: LOGIN.REQUEST,
    params: code
  };
}

export function logout() {
  return {
    type: LOGOUT.REQUEST
  }
}

// =============================================================================
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
export function createLook(id) {
  return {
    type: LOOK.CREATE,
    id: id
  }
}

export function deleteLook(id) {
  return {
    type: LOOK.DELETE,
    id: id
  }
}
