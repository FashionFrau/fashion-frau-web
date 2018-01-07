import axios from 'axios'
import _ from 'lodash'
import queryString from 'query-string'
import { Cookies } from 'react-cookie';

import auth from '../auth/authenticator'

const redirectUri = "http://localhost:8080/auth/callback"
const clientId = "b0a5c417a94a43df83943434131f820b"
const permissions = "basic public_content likes relationships"

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000
})

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(function (config) {
    const user = auth.currentUser()
    if(!_.isUndefined(user) && !_.isUndefined(user.auth_token)) {
      config.headers['Authorization'] = `Bearer ${user.auth_token}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    if (response.status === 401) {
      const cookies = new Cookies()
      cookies.remove('user')
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

/******************************************************************************/

export function fetchLooks(params) {
  const uid = auth.currentUser().uid
  let url = `users/${uid}/looks?`

  if(!_.isUndefined(params)) {
    url += queryString.stringify(params);
  }
  return instance.get(url)
}

export function fetchLook(id) {
  const uid = auth.currentUser().uid
  return instance.get(`users/${uid}/looks/${id}`)
}

export function deleteLook(id) {
  const uid = auth.currentUser().uid
  return instance.delete(`users/${uid}/looks/${id}`)
}

export function createLook(id) {
  const uid = auth.currentUser().uid
  return instance.post(`users/${uid}/looks/${id}/new`)
}

/******************************************************************************/
export function authenticate(code) {
  return instance.get(`/auth/callback?code=${code}`)
}

export function logout() {
  return instance.delete(`/users/sign_out`)
}

export function authUrl() {
  return `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${permissions}`
}
