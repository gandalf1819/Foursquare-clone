import {
  relationships as relationshipsController
} from '../controllers';

import{
  fetchToken
}
from '../middlewares';

var Message = require('../util')
var express = require('express');
var router = express.Router();


router.post('/add-friend', fetchToken, function(req, res, next) {
  relationshipsController.addFriend(req.body ,req.user_details)
    .then(msg => {
      res.send(Message.generateMessage(200, {}, msg));
    })
    .catch(msg => {
      console.log("msg===",msg);
      res.send(Message.generateMessage(422, {}, msg));
    })
});

router.post('/delete-friend', fetchToken, function(req, res, next) {
  relationshipsController.deleteFriend(req.body ,req.user_details)
    .then(msg => {
      res.send(Message.generateMessage(200, {}, msg));
    })
    .catch(msg => {
      console.log("msg===",msg);
      res.send(Message.generateMessage(422, {}, msg));
    })
});

router.get('/', fetchToken, function(req, res, next) {

  relationshipsController.getFriendsSuggestions(req.user_details)
    .then(data => {
      res.send(Message.generateMessage(200, data, "Received Friends Suggestions Successfully!!"));
    })
    .catch(msg => {
      console.log("msg===",msg);
      res.send(Message.generateMessage(422, {}, msg));
    })
});


router.get('/notifications', fetchToken, function(req, res, next) {

  relationshipsController.getFriendsNotifications(req.user_details)
    .then(data => {
      res.send(Message.generateMessage(200, data, "Received Friends SUggestions Successfully!!"));
    })
    .catch(msg => {
      console.log("msg===",msg);
      res.send(Message.generateMessage(422, {}, msg));
    })
});

router.post('/action', fetchToken, function(req, res, next) {
  relationshipsController.friendAction(req.body ,req.user_details)
    .then(msg => {
      res.send(Message.generateMessage(200, {}, msg));
    })
    .catch(msg => {
      console.log("msg===",msg);
      res.send(Message.generateMessage(422, {}, msg));
    })
});

module.exports = router;
