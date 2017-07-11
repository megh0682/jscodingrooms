import React from 'react'
import {list} from 'semantic-ui-react'

const textGlow={
  textShadow: "#6AD8C9 0 0 10px",
   fontSize: '20px',
   color: 'white'
}

const typing = {
  fontSize: '14px',
  fontStyle: 'italic',
  opacity: '.5'
}

const UserList = (props) => {
  return (
   <div class="ui list">
      {props.users.map((user, i) => {
        if (user == props.currentlyTyping) {
          return (

                <a class="item">
                <i class="right triangle icon"></i>
                <div class="content">
                   <div class="header" key={i} style={textGlow}> {user} <span style={typing}>typing...</span> </div>
                </div>
                </a>
             
                )
        } else {

        return (
              
                <a class="item">
                <i class="right triangle icon"></i>
                <div class="content">
                   <div class="header" key={i} style={textGlow}> {user} </div>
                </div>
                </a>
             
                )
        }

      })}
    </div>
  )
}

export default UserList;