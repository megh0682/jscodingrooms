import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import ChatRoomList from './ChatRoomList';
import UserName from './UserName';
import PropTypes from 'prop-types';
import fetchRooms from '../actions/fetchRooms';
import assignUserName from '../actions/assignUserName';

class HomePage extends React.Component {

  
  constructor(props) {
    super(props);
    this.chooseUserName = this.chooseUserName.bind(this);
  }

 componentDidMount(){

        //alert(this.props.userName);
        //alert(this.props.rooms.length);
        if(this.props.rooms.length == 0){
          console.log("I am going to fetchRooms");
          this.props.fetchRooms()
        }
     
  }
  chooseUserName(userName) {
    this.props.assignUserName(userName);
  }

  render() {
    return (
    <div>
      <h2>Welcome {this.props.loggedin.name}! Join any room as {this.props.userName} or enter your avatar name </h2>
      <UserName userName={this.props.userName} chooseUserName={this.chooseUserName}/>
      <br/>
      <ChatRoomList rooms = {this.props.rooms}/>
    </div>
    );
  }
}

function mapStateToProps(state){

//  var obj = state.rooms.availableRooms;
//   for(var prop in obj){
//     alert(`state.${prop} = ${obj[prop]}`);
//   }

//   alert((state.rooms.availableRooms).length);

  // alert("mapStateToProps"+state.currentUser + " : "
  // + typeof(state.availableRooms));

  return{ rooms:state.rooms.availableRooms,
          userName: state.rooms.currentUser,
          loggedin:state.rooms.user }

}

HomePage.propTypes = {
  rooms: PropTypes.array.isRequired,
  fetchRooms:PropTypes.func.isRequired,
  assignUserName:PropTypes.func.isRequired,
  userName:PropTypes.string.isRequired,
  loggedin:PropTypes.object.isRequired

};

export default connect(mapStateToProps,{assignUserName,fetchRooms})(HomePage);