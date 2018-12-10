import
sequelize
from '../models'

const randomstring = require("randomstring");

const register = (regData) => {
  return new Promise((resolve, reject) => {
    let query = `select id from user where email ="${regData.email}"`
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(data => {
        console.log("data======", data);
        if (data.length != 0) {
          reject("Customer already registered")
          return
        }
        query = `insert into user (first_name, last_name, email, password) values("${regData.first_name}","${regData.last_name}","${regData.email}",md5("${regData.password}"))`;
        console.log("query===", query);
        return sequelize.query(query, {
          type: sequelize.QueryTypes.INSERT
        })
      })
      .then(data => {
        resolve("User Successfully Registered!!")
      })
      .catch(err => {
        console.log("err===", err);
        reject("Error Occured during registration. Contact your system administrator!!")
      })
  })
}

const login = (loginData, accessToken)=>{
  return new Promise((resolve,reject)=>{
    let token, userId;
    let query = `select id from user where email ="${loginData.email}" limit 1;`
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(data=>{
        if(data.length==0){
          reject("No user found!!")
          return
        }

        userId = data[0].id;
        if(accessToken==""){
          return Promise.resolve([])
        }
        let query = `select * from token where user_id ="${userId}" and token_id ="${accessToken}" limit 1;`
        return sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
          })

      })
      .then(data=>{
        if(data.length!=0){
          resolve(accessToken)
          return
        }

        token =randomstring.generate({
          length: 12,
          charset: 'alphabetic'
        })

        query = `insert into token (token_id, user_id) values("${token}", "${userId}");`
        return sequelize.query(query, {
            type: sequelize.QueryTypes.INSERT
          })
      })
      .then(data=>{
        resolve(token)
      })
      .catch(err=>{
        console.log("err=", err);
        reject("Error Occured during Logging in. Contact your system administrator!!")
      })
  })
}

const logout = (accessToken)=>{
  return new Promise((resolve, reject)=>{
    let query = `delete from token where token_id ="${accessToken}";`
    sequelize.query(query, {
        type: sequelize.QueryTypes.DELETE
      })
      .then(data=>{
        resolve("Logged Out Successfully!!")
      })
      .catch(err=>{
        console.log("err=", err);
        reject("Error Occured during logging out. Contact your system administrator!!")
      })
  })
}


/* Fetch Friend List after Login */
const friends = (regData, accessToken) => {
  return new Promise((resolve, reject) => {
      let query = `call get_friends_list(${regData.id})`;
      //let query = `SELECT u.first_name FROM USER AS u INNER JOIN friend_list AS fl ON u.id=fl.friend_id WHERE fl.user_id=${regData.id}`;
      sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT
      })
      .then(data => {
          console.log("query====", query);
      })
      .then(data => {
          resolve("Friend list retrieved successfully")
      })
      .catch(err => {
          console.log("err===", err);
          reject("Error occured during data retrieval!")
      })
  })
}


/* Show Friend Requests */
const friendRequests = (regData, userDetails)=> {
  return new Promise((resolve, reject) => {

    let actionRequest, query = {};
    //let query = `call get_friend_requests(${regData.id}, ${userDetails.id}, actionRequest)`;

    sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    })
        .then(data=>{
          console.log("data=",data);

          switch(actionRequest) {
              case "Approve":
                  query = `call get_friend_requests(${regData.id}, ${userDetails.id}, actionRequest);`
                  break;
              case "Cancel":
                  query = `call get_friend_requests(${regData.id}, ${userDetails.id}, actionRequest);`
                  break;
              default:
                  reject("No action found!!")
                  return
          }
          return sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
          })

        })
  })
}


const auth = {
  register,
  login,
  logout
  friends,
  friendRequests
}

export {
  auth
}
