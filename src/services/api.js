import axios from 'axios'
import _ from 'lodash'

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000
})

export function fetchLooks(params) {
  let url = 'users/1/looks?'

  if(!_.isUndefined(params)) {
    url = Object.keys(params).reduce((acc, item) => {
        return acc + '&' + item + '=' + params[item];
      }, url);
  }
  return instance.get(url)
}

export function fetchLook(id) {
  return instance.get(`users/1/looks/${id}`)
}

export function deleteLook(id) {
  return instance.delete(`users/1/looks/${id}`)
}
