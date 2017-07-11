import React from 'react';
import {Button} from 'semantic-ui-react';
import Codemirror from 'react-codemirror';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import assignUserName from '../actions/assignUserName';
import fetchRooms from '../actions/fetchRooms';
import fetchRoomByID from '../actions/fetchRoomByID';
import UserList from './UserList';
import SaveButton from './SaveButton';

const io = require('socket.io-client');
const socket = io();

class ChatRoomDetails extends React.Component {

    constructor(props){
      super(props);
      this.state={code:'',users:[],currentlyTyping:null};
      socket.on('receive code', (payload) => this.updateCodeInState(payload));
      socket.on('new user join', (users) => this.joinUser(users));
      socket.on('load users and code', () => this.sendUsersAndCode());
      socket.on('receive users and code', (payload) => this.updateUsersAndCodeInState(payload))
      socket.on('user left room', (user) => this.removeUser(user))

    }

    componentDidMount(){

    alert(this.props);

    if (this.props.availableRoom.id == undefined) {
      this.props.actions.fetchRooms();
    } else {
      const user = this.props.currentUser
      sessionStorage.setItem('currentUser', user)
      const users = [...this.state.users, this.props.currentUser]
      socket.emit('room', {room: this.props.availableRoom.id, user: user});
      this.setState({users: users})
    }
    }

   componentWillReceiveProps(nextProps) {
    const user = nextProps.currentUser
    const users = [...this.state.users, user]
    socket.emit('room', {room: nextProps.availableRoom.id, user: user});
    this.setState({users: users})
   }

  sendUsersAndCode() {
    socket.emit('send users and code', {room: this.props.availableRoom.id, users: this.state.users, code: this.state.code})
  }

  removeUser(user) {
    const newUsers = Object.assign([], this.state.users);
    const indexOfUserToDelete = this.state.users.findIndex(Olduser => {return Olduser == user.user})
    newUsers.splice(indexOfUserToDelete, 1);
    this.setState({users: newUsers})
  }

  joinUser(user) {
    const combinedUsers = [...this.state.users, user]
    const newUsers = Array.from(new Set(combinedUsers));
    const cleanUsers = newUsers.filter(user => {return user.length > 1})
    this.setState({users: cleanUsers})
  }

  updateCodeInState(payload) {
    this.setState({
      code: payload.code,
      currentlyTyping: payload.currentlyTyping
    });
  }

  updateCodeForCurrentUser(newCode) {
    this.setState({
      code: newCode
    })
  }

  updateUsersAndCodeInState(payload) {
    const combinedUsers = this.state.users.concat(payload.users)
    const newUsers = Array.from(new Set(combinedUsers));
    const cleanUsers = newUsers.filter(user => {return user.length > 1})
    this.setState({users: cleanUsers, code: payload.code})
  }

  codeIsHappening(newCode) {
    this.updateCodeForCurrentUser(newCode)
    this.updateCurrentlyTyping()
    socket.emit('coding event', {code: newCode, room: this.props.availableRoom.id, currentlyTyping: this.props.currentUser})
  }

  updateCurrentlyTyping() {
    this.setState({currentlyTyping: this.props.currentUser})
  }

  clearCode(e) {
    e.preventDefault();
    this.setState({code: ''})
    socket.emit('coding event', {code: '', room: this.props.availableRoom.id})
  }
  
  render(){

        return(
          <div>
              
            <p> This is a chat room details page </p>
            <h1>{this.props.availableRoom.title}</h1>
            <p>{this.props.availableRoom.description}</p>
            <UserList users={this.state.users} currentlyTyping={this.state.currentlyTyping}/>
            <Codemirror value={this.state.code} onChange={this.codeIsHappening.bind(this)} />
            <br/>
            <SaveButton text={this.state.code} lang={this.state.mode} title={this.props.availableRoom.title}/>
            <br/>
            <Button onClick={this.clearCode.bind(this)} className="col-lg-12">clear code</Button>

          </div>

        )


    }

}

function mapStateToProps(state, props) {
  // alert(`props.${prop}: ${props[prop]}`);
  var obj= props['match']['params'];
  for(var o in obj){
      alert(`obj.${o}: ${obj[o]}`);
    }   
  if (state.rooms.availableRooms.length > 0) {
    const availableRoom = state.rooms.availableRooms.filter(availableRoom => {return availableRoom.id == props.match.params.id})[0]
    const userName = sessionStorage.currentUser || state.currentUser
    alert(availableRoom.id);
    return {availableRoom: availableRoom, currentUser: userName}
  } else {
    return {availableRoom: {title: '', description: '', source: ''}, currentUser: ''}
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(fetchRooms,assignUserName,fetchRoomByID, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomDetails)
