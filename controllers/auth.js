import
sequelize
from '../models'

const randomstring = require("randomstring");
const md5 = require("md5");

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
    let query = `select id, password from user where email ="${loginData.email}" limit 1;`
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(data=>{
        console.log("data  =", data);
        if(data.length==0){
          reject("No user found!!")
          return
        }

        if(data[0].password != md5(loginData.password)){
          reject("Invalid password!!")
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
        console.log("data in then =", data);
        if (!data){
          return
        }
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

const auth = {
  register,
  login,
  logout
}


export {
  auth
}
