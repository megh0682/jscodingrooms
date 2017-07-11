export default function assignUserName(userName) {
  sessionStorage.setItem('currentUser', userName);
  return {type: 'ASSIGN_USERNAME', payload: userName};
}

