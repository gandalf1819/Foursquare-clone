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
  console.log("req====", req);
  notesController.createNotes(req.body, req.user_details)
    .then(msg => {
      res.send(Message.generateMessage(200, {}, msg));
    })
    .catch(msg => {
      res.send(Message.generateMessage(422, {}, msg));
    })
});


module.exports = router;
