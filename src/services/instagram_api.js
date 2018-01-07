import axios from 'axios'
import _ from 'lodash'
import queryString from 'query-string'

import auth from '../auth/authenticator'

const V1 = "v1"
const BASE_API_URL = "https://api.instagram.com"

const instance = axios.create({
  baseURL: `${BASE_API_URL}/${V1}`,
  timeout: 1000
})

const USERS = '/users'
const SELF = '/self'
const MEDIA = '/media'
const RECENT = '/recent'

// instance.defaults.headers['Accept'] = 'application/json';
// instance.defaults.headers.get['Access-Control-Allow-Origin'] = 'http://localhost:8080/';
// instance.defaults.headers.post['Content-Type'] = 'application/json';

/******************************************************************************/

export function getRecentMedia(params) {
  let url = `${USERS}${SELF}${MEDIA}${RECENT}?`

  const user = auth.currentUser()

  params = params || {}

  params['access_token'] = user.access_token
  params['count'] |= 12

  if(!_.isUndefined(params)) {
    url += queryString.stringify(params);
  }

  return instance.get(url)
}
