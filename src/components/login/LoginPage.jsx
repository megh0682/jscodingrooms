import React from 'react';
import {Grid} from 'semantic-ui-react';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
  render() {
    return (
       
          <Grid.Row>
              <Grid.Column width={12}>
               <br/>
               <LoginForm/>
              </Grid.Column>
          </Grid.Row>

    );
  }
}

export default LoginPage;