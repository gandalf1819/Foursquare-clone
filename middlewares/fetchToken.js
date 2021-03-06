import
sequelize
from '../models';
var Message = require('../util')


let fetchToken = (req, res, next)=>{
  let accessToken = "", userDetails;

  if(req.cookies['x-access-token']){
    accessToken = req.cookies['x-access-token'];
  }
  else if(req.headers['x-access-token']){
    accessToken = req.headers['x-access-token'];
  }
  else
    return res.redirect('/login/')

  //accessToken ="szNPAJoMEbXA";

  let query = `select user.* from user inner join token on user.id = token.user_id where token_id ="${accessToken}";`
  sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(data=>{
      if(!data[0]){
        res.send(Message.generateMessage(422, {}, "Not authorized to see the page as access token not found!!"));
        return
      }
      req.user_details = data[0];
      req.user_details['x-access-token']= accessToken
      next();
    })
    .catch(err=>{
      console.log("err =", err);
      res.send(Message.generateMessage(422, {}, "Error occured during accessing token. Please contact your system administrator!!"));
    })
}


export{
  fetchToken
}
