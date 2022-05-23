import decode from 'jwt-decode';

class AuthService {
  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }
  // check if the user is still logged in
  loggedIn() {
    const token = this.getToken();
    //type recursion
    return !!token && !this.isTokenExpired(token);
  }
  // check if token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch(err) {
      return false;
    }
  }
  // retrieve token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }
  // set token to localStorage and reload page to dashboard
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    if (!idToken) {
      window.location.assign('/');
    } else {
      window.location.assign('/dashboard')
    }
  }
  
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();