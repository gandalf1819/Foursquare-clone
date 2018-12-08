import {
  filters as filtersController
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
  filtersController.updateFilters(req.body, req.user_details)
    .then(data => {
      res.send(Message.generateMessage(200, data, "Filter Added Successfully!!"));
    })
    .catch(msg => {
      console.log("msg===",msg);
      res.send(Message.generateMessage(422, {}, msg));
    })
});

router.get('/states', fetchToken, function(req, res, next) {
  console.log("req====", req);
  filtersController.getStates(req.user_details)
    .then(data => {
      res.send(Message.generateMessage(200, data, "States Fetched Successfully!!"));
    })
    .catch(msg => {
      console.log("msg===",msg);
      res.send(Message.generateMessage(422, {}, msg));
    })
});


module.exports = router;
