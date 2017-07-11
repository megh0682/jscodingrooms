import axios from 'axios';
import jwtDecode from 'jwt-decode';
import isEmpty from 'lodash/isEmpty';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function setCurrentUser(user) {
  if(!isEmpty(user)){
    console.log("USER:"+user.username);
  }
  return {
    type: 'SET_CURRENT_USER',
    user:user
  };
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data).then(res => {
      const token = res.data.token;
      sessionStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}

export function logout() {
  console.log("I am in LOGOUT ACTION CALL");
  sessionStorage.removeItem('jwtToken');
  //sessionStorage.removeItem('currentUser');
  return {type: 'REMOVE_USER_SESSION_OBJECT'}
}




