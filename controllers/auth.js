import
sequelize
from '../models'


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


const auth = {
  register
}


export {
  auth
}
