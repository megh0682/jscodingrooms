import React from 'react';
import PropTypes from 'prop-types';
import ChatRoom from './ChatRoom';
import HomePage from './HomePage';
import { Button, Image, List } from 'semantic-ui-react';

export default function ChatRoomList(props){

 console.log(props);

 const emptyChatRoomList = ( 
     <p>No rooms available </p>
  );
  
 
 const ChatRoomList = (props) => {
   
   return (
   <div>
    <List divided verticalAlign='middle' size='big'>
    
     {props.rooms.map((room, i) => {
        return <ChatRoom key={i} roomID= {room.id}  roomTitle={room.title} logo ={room.logo}/>
      })}

    </List>
  </div>

  );
 }

  return (
 
    <div>
    {props.rooms.length === 0? emptyChatRoomList:ChatRoomList(props)}
    </div>
  );
} 







