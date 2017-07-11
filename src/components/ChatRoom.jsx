import React from 'react';
import personlogo from '../person.png';
import { Button, Image, List } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class ChatRoom extends React.Component {

    render(){

        return(
    <List.Item>
      <List.Content floated='right'>
      <Button size='massive' color='teal' inverted='true'> <Link to={`/rooms/${this.props.roomID}`}>Join</Link></Button>
      </List.Content>
      <Image avatar src={this.props.logo} size='tiny'/>
      <List.Content>
        {this.props.roomTitle}
      </List.Content>
    </List.Item>
       
        )


    }

}

function mapStateToProps(state){

  return{ userName: state.currentUser }

}


export default ChatRoom;