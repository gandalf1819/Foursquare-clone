import auth from './auth'
import notes from './notes'
import filters from './filters'
import relationships from './relationships'
var express = require('express');
var router = express.Router();
import {
  posts as postsController
} from '../controllers';

var Message = require('../util')
import{
  fetchToken
}
from '../middlewares';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/login/', function(req, res, next) {
  res.render('login');
});

router.get('/posts/',fetchToken, function(req, res, next) {
  postsController.getPostsPageData(req.user_details)
    .then(data => {
      console.log("data =", data);
      res.render('posts', data);
    })
    .catch(err => {
      console.log("err while getting posts data =", err);
      res.redirect('/login/')
    })

});

router.get('/tags/',fetchToken, function(req, res, next) {
  postsController.getTags()
    .then(data => {
      res.send(Message.generateMessage(200, data, "Tags List Provided Successfully!!"));
    })
    .catch(msg => {
      res.send(Message.generateMessage(422, {}, msg));
    })
});

router.use('/auth/', auth)
router.use('/notes/', notes)
router.use('/filters/', filters)
router.use('/relationships/', relationships)



module.exports = router;
