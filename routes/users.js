import express from 'express';
import bcrypt from 'bcryptjs';
import isEmpty from 'lodash/isEmpty';
import commonValidations from '../validations/signup';
import Users from '../models/Users';

let router = express.Router();

function validateInput(data, otherValidations) {
  console.log(otherValidations(data).errors);
  //let { errors } = otherValidations(data);
  var errors = otherValidations(data).errors;
  return  Users.find({ email: data.username }).limit(1).exec()
  .catch(function(err) {
        console.log(err);
        res.status(500).json({ error: err })
   })
  .then(function(doc) {
        console.log(doc);
        if(!isEmpty(doc)){
          if(doc.data.email===data.username){
            errors.username = 'This username is already in use';
          }
        }
    console.log(errors);  
    console.log(isEmpty(errors));
    return {
      errors,
      isValid: isEmpty(errors)
    };
   });
  
}
  

/**
 * Get /api/users/:id
 */

router.get('/:id', (req, res) => {

  Users.findById(req.params.id, function (err, doc){
    if (err) {
      console.log(err);
      res.status(500).json({ error: err })

    }
    else {
     res.json({doc});
    }
  });

});

/**
 * Get /api/users/:username
 */

router.get('/:username', (req, res) => {
 console.log("username " + req.params.username);
 Users.
  find({
    email: username
  }).
  limit(1).exec(function(err, doc) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err })
    }
    else {
       res.json({doc});
    }
  });
}); 


/**
 * Post /api/users
 */
router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then((data) => {
    console.log(data);
    if (data.isValid) {
      const { username, password,name } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);
      
      Users.create({
        name: name,
        email:username,
        password:password_digest
       }, function(err,doc) {
        if (err) {
        res.status(500).json({ error: err })
        console.log(err);
        }
        else {
        console.log("new user created in DB: "+doc._id);
        res.json({ success: true });        
        }
    });
    }else {
      res.status(400).json(data.errors);
    }


  });
});


export default router;