import axios from 'axios';

// Access-Control-Allow-Origin
var instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000
});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const api = {
  fetchLooks() {
    return instance.get('users/1/looks');
  }
  // getProducts() {
  //   return new Promise( resolve => {
  //     setTimeout(() => resolve(_products), TIMEOUT)
  //   })
  // }
}
