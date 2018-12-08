import auth from './auth'
import notes from './notes'
import filters from './filters'
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'} );
});

router.get('/login/', function(req, res, next) {
  res.render('login');
});

router.get('/posts/', function(req, res, next) {
  res.render('posts', { friends: 'Friends' });
});

router.get('/friends', function(req, res, next) {
  res.render('friends');
})

router.use('/auth/', auth)
router.use('/notes/', notes)
router.use('/filters/', filters)

module.exports = router;
