import {
  auth as authController
} from '../controllers'
var Message = require('../util')
var express = require('express');
var router = express.Router();


router.post('/register', function(req, res, next) {
  console.log("req====", req.body);
  let data = {
    "email": req.body.email,
    "first_name": req.body.firstName,
    "last_name": req.body.lastName,
    "password": req.body.password
  }
  authController.register(data)
    .then(msg => {
      res.send(Message.generateMessage(200, {}, msg));
    })
    .catch(msg => {
      res.send(Message.generateMessage(422, {}, msg));
    })



});

module.exports = router;
