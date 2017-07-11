import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  var errors = {};
  //console.log("error initialize as empty object"+errors);

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }else if (!Validator.isEmail(data.username)) {
      errors.username = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }else if(!(Validator.isLength(data.password,{min:6,max:20}))){
    errors.password = 'This field should have minimum length of 6 and max of 20';
  }
  
  return {
    errors:errors,
    isValid: isEmpty(errors)
  }
}