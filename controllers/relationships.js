import
sequelize
from '../models'

const axios = require('axios')

const getFriendsSuggestions = (userDetails) => {
  return new Promise((resolve, reject) => {
    let query = `select * from user u left outer join friend_list fl on u.id = fl.user_id and fl.friend_id =${userDetails.id} where u.id!=${userDetails.id} and (action is null or action!="Request_Sent")`;
    sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(data=>{
      console.log("data =", data);
      resolve(data);
    })
    .catch(err=>{
      console.log("err =", err);
      reject("Error occured while getting friends suggestions. Please contact your system administrator!!")
    })
  })
}

const addFriend = (reqData, userDetails)=>{
  return new Promise((resolve,reject)=>{
    let promises =[],
    query = `insert into friend_list values (${userDetails.id}, ${reqData.friend_id}, "Request_Sent") on duplicate key update user_id = ${userDetails.id}, friend_id = ${reqData.friend_id}, action ="Request_Sent"`;
    promises.push(sequelize.query(query, {
      type: sequelize.QueryTypes.INSERT
    }))

    query = `insert into friend_list values (${reqData.friend_id}, ${userDetails.id}, "Request_Received") on duplicate key update user_id = ${reqData.friend_id}, friend_id = ${userDetails.id}, action ="Request_Received"`;
    promises.push(sequelize.query(query, {
      type: sequelize.QueryTypes.INSERT
    }))

    Promise.all(promises)
    .then(data =>{
      console.log("data =", data);
      resolve("Friend Request Sent Successfully!!")
    })
    .catch(err=>{
      console.log("err =", err);
      reject("Error occured while adding friends. Please contact your system administrator!!")
    })


  })
}

const deleteFriend = (reqData, userDetails)=>{
  return new Promise((resolve, reject)=>{
    let promises =[],
    query = `insert into friend_list values (${userDetails.id}, ${reqData.friend_id}, "Rejected") on duplicate key update user_id = ${userDetails.id}, friend_id = ${reqData.friend_id}, action ="Rejected"`;
    promises.push(sequelize.query(query, {
      type: sequelize.QueryTypes.INSERT
    }))

    query = `insert into friend_list values (${reqData.friend_id}, ${userDetails.id}, "Rejected") on duplicate key update user_id = ${reqData.friend_id}, friend_id = ${userDetails.id}, action ="Rejected"`;
    promises.push(sequelize.query(query, {
      type: sequelize.QueryTypes.INSERT
    }))

    Promise.all(promises)
    .then(data =>{
      console.log("data =", data);
      resolve("Unfriended Successfully!!")
    })
    .catch(err=>{
      console.log("err =", err);
      reject("Error occured while unfriending. Please contact your system administrator!!")
    })
  })
}

const getFriendsNotifications = (userDetails)=>{
  return new Promise((resolve, reject)=>{
    let query = `select * from user u inner join friend_list fl on u.id = fl.friend_id where fl.user_id=${userDetails.id} and action ="Request_Received"`;
    sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(data=>{
      console.log("data =", data);
      resolve(data);
    })
    .catch(err=>{
      console.log("err =", err);
      reject("Error occured while getting friends notifications. Please contact your system administrator!!")
    })
  })
}

const friendAction = (reqData, userDetails)=>{
  return new Promise((resolve, reject)=>{
    let promises =[],
    query = `insert into friend_list values (${userDetails.id}, ${reqData.friend_id}, "${reqData.action}") on duplicate key update user_id = ${userDetails.id}, friend_id = ${reqData.friend_id}, action ="${reqData.action}"`;
    promises.push(sequelize.query(query, {
      type: sequelize.QueryTypes.INSERT
    }))

    query = `insert into friend_list values (${reqData.friend_id}, ${userDetails.id}, "${reqData.action}") on duplicate key update user_id = ${reqData.friend_id}, friend_id = ${userDetails.id}, action ="${reqData.action}"`;
    promises.push(sequelize.query(query, {
      type: sequelize.QueryTypes.INSERT
    }))

    Promise.all(promises)
    .then(data =>{
      console.log("data =", data);
      resolve(`Friend Request ${reqData.action} Successfully!!`)
    })
    .catch(err=>{
      console.log("err =", err);
      reject("Error occured while unfriending. Please contact your system administrator!!")
    })
  })
}


const relationships = {
  getFriendsSuggestions,
  addFriend,
  deleteFriend,
  getFriendsNotifications,
  friendAction
}

export {
  relationships
}
