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

router.post('/login', function(req, res, next) {
  console.log("req====", req.cookies);
  let accessToken="";
  if(req.cookies['x-access-token']){
    accessToken = req.cookies['x-access-token'];
  }

  let data = {
    "email": req.body.email,
    "password": req.body.password
  }
  authController.login(data, accessToken)
    .then(token => {
      res.cookie('x-access-token', token)
      let data = {
        "x-access-token": token
      }

      res.send(Message.generateMessage(200, data, "User Successfully LoggedIn!!"));
    })
    .catch(msg => {
      res.send(Message.generateMessage(422, {}, msg));
    })
});

router.post('/friends', function(req, res, next) {
  console.log("req====", req.cookies);
  if(req.cookies['x-access-token']){
    accessToken = req.cookies['x-access-token'];
  }

  let data = {
    "first_name": req.user.first_name    
  }

  authController.friends(data)
    .then(token => {
      res.cookie('x-access-token', token)
      let data = {
        "x-access-token": token
      }

      res.send(Message.generateMessage(200, data, "Friend List fetch successfully!"));
    })
    .catch(msg => {
      res.send(Message.generateMessage(422, {}, msg));
    })
})

router.delete('/logout', function(req, res, next) {
  console.log("req====", req.cookies);
  let accessToken="";
  if(req.cookies['x-access-token']){
    accessToken = req.cookies['x-access-token'];
  }

  authController.logout(accessToken)
    .then(msg => {
      res.cookie('x-access-token', '', {expires: new Date(0)})

      res.send(Message.generateMessage(200, {}, msg));
    })
    .catch(msg => {
      res.send(Message.generateMessage(422, {}, msg));
    })
});

module.exports = router;
