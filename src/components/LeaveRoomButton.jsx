import React from "react";
import {Button} from 'semantic-ui-react';
import HomePage from './HomePage';

class LeaveRoomButton extends React.Component {

  constructor(props) {
    super(props)
    this.state = {roomtitle: this.props.roomtitle, roomid: this.props.roomID,currentUser:this.props.currentUser}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({roomtitle: nextProps.roomtitle, roomid: nextProps.roomID, currentUser:nextProps.currentUser})
  }

  // leaveRoom(e) {
  //   e.preventDefault();
  //   socket.emit('leave room', {roomtitle: this.state.roomtitle,roomid: this.state.roomid,currentUser:this.state.currentUser });
    
  // }

  render() {
    return (
      <Button color='orange' size='big' onClick={this.props.leaveRoomEvent}>Leave Room</Button>
    )
  }
} 


export default LeaveRoomButton