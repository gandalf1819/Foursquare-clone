import
{users as usersController}
from "../controllers";

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/friends', function(req, res, next) {
    console.log("req====", req.cookies);
    let accessToken="";
    if(req.cookies['x-access-token']){
        accessToken = req.cookies['x-access-token'];
    }

    let data = {
        "first_name": req.user.first_name
    }

    usersController.friends(data)
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

module.exports = router;
