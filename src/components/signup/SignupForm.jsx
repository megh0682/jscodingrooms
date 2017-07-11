import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Button, Checkbox, Form, Input,Label } from 'semantic-ui-react';


class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      username: '',
      password: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }
  
  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = this.validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid
  }

   checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = field + ' is already in use';
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }
  
onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      //alert(this.state.name);
      //alert(this.state.username);
      //alert(this.state.password);
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You have signed up successfully.Login here to join the coding rooms!'
          })
           this.context.router.history.push('/login');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

validateInput(data) {
  let errors={};
  
  if (isEmpty(data.username)) {
    errors.username = 'This field is required';
  }else if(!data.username.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      errors.username = 'email is invalid';
  }

  if (isEmpty(data.name)) {
    errors.name= 'This field is required';
  }
  
  if (isEmpty(data.password)) {
    errors.password = 'This field is required';
  }else if (data.password.length < 6 ) {
    errors.password = 'This field should be 6 or more character in length';
  }

 //alert(isEmpty(errors));
 
  return {
    errors,
    isValid: isEmpty(errors)
  }

}

  render() {
   const { errors,name,username,password } = this.state;
      
    return (
   <Form  inverted='true' size='big'>
    <Form.Field type='text'required='true'  error={errors.name}>
      <Label horizontal ='true' inverted='true' size='massive'color='teal'>Name</Label>
      <Input inverted='true' size='big' placeholder='name' name='name' type='text'onChange={this.onChange} value={name}/>
    </Form.Field>
    <Form.Field type='email'required='true'  error={errors.username}>
      <Label horizontal ='true' inverted='true' size='massive'color='teal'>Email</Label>
      <Input inverted='true' size='big'  placeholder='email' type='email' onChange={this.onChange} value={username}
        name='username' />
    </Form.Field>
    <Form.Field type='password'required='true' error={errors.password}>
      <Label horizontal ='true' inverted='true' size='massive'color='teal'>Password</Label>
     <Input inverted='true' size='big'  placeholder='password' type='password' onChange={this.onChange} value={password} name='password'/>
    </Form.Field>
    <Form.Field>
    <Button inverted='true' size='big' color='teal' type='submit' onClick={this.onSubmit}>Submit</Button>
     </Form.Field>
     </Form>
    )
  }
} 

SignupForm.proptypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default SignupForm