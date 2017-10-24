import { Cookies } from 'react-cookie';
import _ from 'lodash'

class Auth {

  static currentUser() {
    const cookies = new Cookies()
    const user = cookies.get('user')

    if (!_.isUndefined(user)) {
      return user
    }
    return undefined
  }

  static isLogged() {
    const user = this.currentUser()

    if (!_.isUndefined(user)) {
      return !!user.auth_token
    }
    return false
  }
}

export default Auth;
