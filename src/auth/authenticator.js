class Auth {
  static loggedIn() {
    return true;
    // return !!sessionStorage.jwt;
  }

  static logOut() {
    sessionStorage.removeItem('jwt');
  }
}

export default Auth;
