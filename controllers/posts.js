import
sequelize
from '../models'

const axios = require('axios')

const getPostsPageData = (userDetails) => {
  return new Promise((resolve, reject) => {
    let promises = [],
      headers = {
        headers: {
          'x-access-token': userDetails['x-access-token']
        }
      }
    promises.push(axios.get('http://localhost:3000/relationships', headers))
    promises.push(axios.get('http://localhost:3000/relationships/notifications', headers))
    promises.push(axios.get('http://localhost:3000/filters/states', headers))

    Promise.all(promises)
      .then(data => {
        let res = {
          "relationships": data[0].data.Data,
          "notifications": data[1].data.Data,
          "states": data[2].data.Data
        }
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getTags =()=>{
  return new Promise((resolve, reject)=>{
    let query = `select * from tag`;
    sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(data=>{
      resolve(data)
    })
    .catch(err=>{
      console.log("err while getting tags =", err);
      reject("Error occured while getting tags. Please contact your system administrator!!")
    })
  })
}

const posts = {
  getPostsPageData,
  getTags
}

export {
  posts
}
