import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import initialState from './reducers/initialState';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
//eslint-disable-next-line
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';
import jwtDecode from 'jwt-decode';

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
  applyMiddleware(thunk)
 )
);

if (sessionStorage.jwtToken) {
  setAuthorizationToken(sessionStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(sessionStorage.jwtToken)));
}

ReactDOM.render(
<BrowserRouter>
    <Provider store = {store}>
    <App />
    </Provider>
</BrowserRouter>, 
document.getElementById('root')
);
