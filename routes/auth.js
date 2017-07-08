import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';
import config from '../config';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();
router.post('/', (req, res) => {
  const { username, password } = req.body;
  //const password_digest = bcrypt.hashSync(password, 10);

  Users.find({ email: username }).limit(1).exec()
  .catch(function(err) {
        console.log(err);
        res.status(500).json({ error: err })
   })
  .then(function(user) {
        console.log(user);
        if(!isEmpty(user)){
            if(user[0].email===username){
              console.log("email is same");
              console.log("DB PWD:"+user[0].password);
              console.log("USER PWD:"+password);
             if (bcrypt.compareSync(password, user[0].password)) {
                 console.log("password is same");
                  console.log(user[0]['_id']);
                 const token = jwt.sign({
                  id: user[0]['_id'],
                  username: user[0]['email'],
                  name:user[0]['name']
            }, config.jwtSecret);
             console.log("TOKEN:"+token);
             res.json({ token });
             } else {
             res.status(401).json({ errors: { form: 'Invalid Credentials' } });
             }
          }
        }else {
       res.status(401).json({ errors: { form: 'Invalid Credentials...' } });
        }
   });
});

export default router;