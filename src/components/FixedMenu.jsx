import React, { Component,PropTypes } from 'react'
import {Link} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';


class FixedMenu extends Component {
   constructor(props) {
    super(props);
    this.state={ activeItem:''};
    this.handleItemClick  = this.handleItemClick.bind(this);
   }
  
 componentWillMount(){
    
    //alert("IAMCALLED");
    //alert(isEmpty(this.props.loggedin));
    if (!isEmpty(this.props.loggedin)){
         this.state={ activeItem:'Home'};
         this.context.router.history.push('/rooms');  

    }else{
         this.state={ activeItem:'Login'};
         this.context.router.history.push('/login');  
    }

}

handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
render(){
  const  activeItem = this.state.activeItem;  
  //alert(activeItem);

  if (!isEmpty(this.props.loggedin)){
  //alert("INSIDE LOGGED IN DISPLAY");
   return (
  <Menu size="big" inverted='true' widths="two">
        <Menu.Item
          as={Link} to='/rooms'
          name='Home'
          className='menuItem'
           color='orange'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
        >
         All Rooms
        </Menu.Item>

        <Menu.Item
          name='Add Room'
          color='orange'
          className='menuItem'
          active={activeItem === 'Add Room'}
          onClick={this.handleItemClick}
        >
          Add Room
        </Menu.Item>
  </Menu>
     
    )
    }else{
         //alert("INSIDE NOT LOGGED IN DISPLAY");
    return(
       
       <Menu widths="two" size="big" inverted='true'>
        <Menu.Item
              name='Login'
              as={Link} to='/login'
            className='menuItem'
              active={activeItem === 'Login'}
              color='orange'
              onClick={this.handleItemClick}
            >
            Login
            </Menu.Item>
     
        <Menu.Item
          name='New User Signup'
          as={Link} to='/signup'
          color='orange'
          className='menuItem'
          active={activeItem === 'New User Signup'}
          onClick={this.handleItemClick}
        >
          New User Signup
       </Menu.Item>
   </Menu>
       
      )


    }
       
  }
}

FixedMenu.propTypes = {  
 loggedin: PropTypes.object.isRequired
}

FixedMenu.contextTypes = {
  router:PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {  
  return {loggedin: state.rooms.user};
}

export default connect(mapStateToProps)(FixedMenu);
