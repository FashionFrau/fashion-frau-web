import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000
})

export function fetchLooks() {
  return  instance.get('users/1/looks');
}
