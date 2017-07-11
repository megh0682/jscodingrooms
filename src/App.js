import React, { Component } from 'react';
import { BrowserRouter as Router,Link, Route, Switch,Redirect } from 'react-router-dom';
import { Button, Image, List,Menu,Container } from 'semantic-ui-react';
import Page404 from './components/Page404';
import HomePage from './components/HomePage';
import ChatRoomDetails from './components/ChatRoomDetails';
import FixedHeader from './components/FixedHeader';
import FixedMenu from './components/FixedMenu';
import FlashMessagesList from './components/flash/FlashMessagesList';
import logo from './chat.png';
import './App.css';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
  
  <div className="App">
    <div className="App-header">
        <FixedHeader/>
    </div>
    <div className="App-Intro">
        <FixedMenu/>  
    </div>
  
  <div className="App-body">
     
     <FlashMessagesList />
     <Routes/>
     
 </div>

  </div>
  
    );
  }
}

export default App;
