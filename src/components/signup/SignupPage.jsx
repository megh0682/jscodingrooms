import React from 'react';
import {Grid} from 'semantic-ui-react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends React.Component {
  render() {
    const { userSignupRequest, addFlashMessage, isUserExists } = this.props;
    return (
        <Grid.Row>
              <Grid.Column width={12}>
               <br/>
              <SignupForm
            isUserExists={this.props.isUserExists}
            userSignupRequest={this.props.userSignupRequest}
            addFlashMessage={this.props.addFlashMessage} />
              </Grid.Column>
        </Grid.Row>
    );
  }
}

SignupPage.proptypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage, isUserExists })(SignupPage);