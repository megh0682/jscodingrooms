import initialState from './initialState'
import isEmpty from 'lodash/isEmpty';


export default function currentUserReducer(state=initialState, action) {
  switch(action.type) { 
    case 'ASSIGN_USERNAME': 
      sessionStorage.setItem('currentUser', action.payload);
      state = {...state,currentUser:action.payload};
      return state
      //return action.payload;
    case 'SET_CURRENT_USER':     
     state = {...state, isAuthenticated: !isEmpty(action.user),
                         user: action.user
                        
             };
     //alert(state.user.username);
     //alert(state.isAuthenticated);
     return state;     
    default:
     return  state;
  }
}