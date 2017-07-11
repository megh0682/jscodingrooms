import initialState from './initialState';
import isEmpty from 'lodash/isEmpty';

export default function rooms(state=initialState,action){

switch (action.type) {
    case 'ASSIGN_USERNAME': 
      state = {...state,currentUser:action.payload};
      return state
      //return action.payload;
    case 'SET_CURRENT_USER':     
     state = {...state, isAuthenticated: !isEmpty(action.user),
                         user: action.user
                        
             };
    //  alert(state.user.username);
    //  alert(state.isAuthenticated);
    //  alert(state.currentUser);
    //  alert(state.availableRooms);
     
     return state;     
      
    case 'GET_ROOMS':
      // alert("GET_ROOMS"+ state.availableRooms.length);
       state = {...state,availableRooms:action.payload}; 
       return state;

    case 'GET_ROOM_BY_ID':
        return action.payload; 
    
    case 'REMOVE_USER_SESSION_OBJECT':     
     state = {...state, isAuthenticated: false,
                         user: {}
                        
             };
    //  alert(state.user.username);
    //  alert(state.isAuthenticated);
    //  alert(state.currentUser);
    //  alert(state.availableRooms);
     return state;   

   default:
       // alert("DEFAULT"+state.availableRooms.length);
        return state;
}


}


