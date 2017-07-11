import React from 'react';
import {Button,Grid,Icon,Divider,Header,Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Codemirror from 'react-codemirror';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import assignUserName from '../actions/assignUserName';
import fetchRooms from '../actions/fetchRooms';
import fetchRoomByID from '../actions/fetchRoomByID';
import UserList from './UserList';
import SaveButton from './SaveButton';
import LeaveRoomButton from './LeaveRoomButton';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/twilight';

const io = require('socket.io-client');
const socket = io();

const textFont={
   fontSize: '1.2em'
 }

class ChatRoomDetails extends React.Component {

    constructor(props){
      super(props);
      this.state={code:'',users:[],currentlyTyping:null};
      socket.on('receive code', (payload) => this.updateCodeInState(payload));
      socket.on('new user join', (users) => this.joinUser(users,function(){
       
        console.log("user "+users + " joined room");

      }));
      socket.on('load users and code', () => this.sendUsersAndCode());
      socket.on('receive users and code', (payload) => this.updateUsersAndCodeInState(payload))
      socket.on('user left room', (user) => this.removeUser(user,function(){

        console.log("user "+user + " left room");

      }));

      this.leaveRoomEvent=this.leaveRoomEvent.bind(this);

    }

    componentDidMount(){

    //alert(this.props);

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
    //Add function to check for duplicate username
    const users = [...this.state.users, user]
    socket.emit('room', {room: nextProps.availableRoom.id, user: user});
    this.setState({users: users})
   }
  
  componentWillUnmount(){
     //alert("componentWillUnmount CALLED");
     this.leaveRoomEvent();
  }

  leaveRoomEvent(){
    //alert("leaveRoomEvent CALLED");
    socket.emit('leave room',{room: this.props.availableRoom.id,user:this.props.currentUser});

  }

  sendUsersAndCode() {
    socket.emit('send users and code', {room: this.props.availableRoom.id, users: this.state.users, code: this.state.code})
  }

  removeUser(user) {
    const newUsers = Object.assign([], this.state.users);
    const indexOfUserToDelete = this.state.users.findIndex(Olduser => {return Olduser == user})
    //alert("delete user at index "+indexOfUserToDelete);
    newUsers.splice(indexOfUserToDelete, 1);
    this.setState({users: newUsers})
  }

  joinUser(user) {
    const combinedUsers = [...this.state.users, user]
    const newUsers = Array.from(new Set(combinedUsers));
    const cleanUsers = newUsers.filter(user => {return user.length > 1})
    this.setState({users: cleanUsers})
    console.log("User - "+ user + " joined");
    //Add a component to notify the joining of the new user
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
  <Grid>
  <Grid.Row>
    <Grid.Column width={12}>
        <br/>
        <Label size='huge' color='teal'>Room: </Label><p style={textFont}> {this.props.availableRoom.title} </p>
        <Label size='huge' color='teal'>Purpose: </Label><p style={textFont}>{this.props.availableRoom.description}</p>
    </Grid.Column>
  </Grid.Row>
  <Grid.Row>
      <Grid.Column width={12}>
        <AceEditor mode="javascript" 
                width="950px"
                fontSize="1.5em" 
                theme="twilight" 
                value={this.state.code} 
                onChange={this.codeIsHappening.bind(this)} 
                name="aceEditor"
                className="ui left floated"/> 
      </Grid.Column>
      <Grid.Column width={4} className='ui center aligned'>
         <Icon name='users' size='huge' color ='orange'/>
         
         <UserList users={this.state.users} 
               currentlyTyping={this.state.currentlyTyping}  
               className="ui right floated" /> 
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={12} className="ui center aligned">
        <SaveButton text={this.state.code} lang="javascript" title={this.props.availableRoom.title} />
        <Button inverted='true' color='teal' size='big' onClick={this.clearCode.bind(this)} >clear code</Button>
        <Button inverted='true' color='teal' size='big' ><Link to={`/rooms`}>exit room</Link></Button>
        {/*<LeaveRoomButton roomtitle={this.props.availableRoom.title} 
                         roomID={this.props.availableRoom.id}
                         user = {this.props.currentUser}
                         leaveRoomEvent = {this.state.leaveRoomEvent}
                          />*/}
      </Grid.Column>
    </Grid.Row>
  </Grid>   
</div>

        )


    }

}

function mapStateToProps(state, props) {
  // alert(`props.${prop}: ${props[prop]}`);
  var obj= props['match']['params'];
  for(var o in obj){
      //alert(`obj.${o}: ${obj[o]}`);
    }   
  if (state.rooms.availableRooms.length > 0) {
    const availableRoom = state.rooms.availableRooms.filter(availableRoom => {return availableRoom.id == props.match.params.id})[0];
    const userName = sessionStorage.currentUser || state.rooms.currentUser;
    //alert("ROOMID:"+availableRoom.id);
    //alert("currentUser"+userName);
    return {availableRoom: availableRoom, currentUser: userName}
  } else {
    return {availableRoom: {title: '', description: '', source: ''}, currentUser: ''}
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(fetchRooms,assignUserName,fetchRoomByID, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomDetails)
