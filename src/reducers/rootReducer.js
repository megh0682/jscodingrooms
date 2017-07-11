import {combineReducers} from  'redux';
//import currentUser from './currentUserReducer';
import rooms from './rooms';
import flashMessages from './flashMessages';

export default combineReducers({
 rooms,
 flashMessages
});