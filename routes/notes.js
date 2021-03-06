import {
  notes as notesController
} from '../controllers';

import{
  fetchToken
}
from '../middlewares';

var Message = require('../util')
var express = require('express');
var router = express.Router();


router.post('/', fetchToken, function(req, res, next) {
  notesController.createNotes(req.body, req.user_details)
    .then(msg => {
      res.send(Message.generateMessage(200, {}, msg));
    })
    .catch(msg => {
      res.send(Message.generateMessage(422, {}, msg));
    })
});

router.get('/', fetchToken, function(req, res, next) {

  notesController.getNotes(req.query.filter_id, req.user_details)
    .then(data => {
      res.send(Message.generateMessage(200, data, "Notes filtered Successfully!!"));
    })
    .catch(msg => {
      res.send(Message.generateMessage(422, {}, msg));
    })
});

router.post('/comment/', fetchToken, function(req, res, next) {
  console.log("req====", req);
  notesController.addComment(req.body, req.user_details)
    .then(data => {
      res.send(Message.generateMessage(200, data, "Comment Added Successfully!!"));
    })
    .catch(msg => {
      res.send(Message.generateMessage(422, {}, msg));
    })
});



module.exports = router;
