import React, { Component,PropTypes } from 'react';
import { Header, Icon, Image,Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { logout } from '../actions/authActions';
import logo from '../chat.png';
import '../App.css';


class FixedHeader extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut(event) {
    event.preventDefault();
    this.props.logout();
    this.context.router.history.push('/login');

  }

  render() {
if (!isEmpty(this.props.loggedin)){
return(
  <div>
    <Header as='h2' icon image='https://ak2.picdn.net/shutterstock/videos/19023148/thumb/1.jpg'>
     <Icon name='users' size='huge' color ='orange' className='App-logo' />
      {/*<Icon name='chat rooms' circular className='App-logo' color='orange' />*/}
      <Header.Content className='headerText'>
       JS Coding Rooms
      </Header.Content>
     </Header>
       <Button color='teal' size='small' inverted='true' onClick={this.logOut} floated='right'>Log Out</Button>
    
  </div>
)
}else{
return(
  <div>
    <Header as='h2' icon textAlign='center' image='https://ak2.picdn.net/shutterstock/videos/19023148/thumb/1.jpg'>
      <Icon name='users' size='huge' color ='orange' className='App-logo' />
      {/*<Icon name='chat rooms' circular className='App-logo' color='orange' />*/}
      <Header.Content className='headerText'>
       Coding Chat Rooms
      </Header.Content>
    </Header>
    
  </div>
)

}



  }
}

FixedHeader.propTypes = {  
 loggedin: PropTypes.object.isRequired,
 logout: PropTypes.func.isRequired
}

FixedHeader.contextTypes = {
  router: React.PropTypes.object.isRequired
}


function mapStateToProps(state, ownProps) {  
  return {loggedin: state.rooms.user};
}

export default connect(mapStateToProps,{logout})(FixedHeader);
