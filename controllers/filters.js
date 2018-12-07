import
sequelize
from '../models'


const updateFilters = (reqData, userDetails) => {
  return new Promise((resolve, reject) => {
    let inClause = "",
      filterId,
      query;
    if (reqData.area_name) {
      reqData.area_name = `'${reqData.area_name}'`
    }
    let promise = Promise.resolve([]);

    if (reqData.latitude && reqData.longitude && reqData.area_name) {
      query = `insert into location (area_name, latitude, longitude) values(${reqData.area_name},${reqData.latitude},${reqData.longitude}) on duplicate key update area_name = ${reqData.area_name}, latitude = ${reqData.latitude}, longitude = ${reqData.longitude};`;
      promise = sequelize.query(query, {
        type: sequelize.QueryTypes.INSERT
      })
    }

    promise
      .then(data => {
        console.log("data=", data);
        query = `select loc_id from location where latitude = ${reqData.latitude} and longitude = ${reqData.longitude};`;
        return sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT
        })

      })
      .then(data => {
        console.log("data =", data);

        reqData.loc_id = (data[0] && data[0].loc_id) ? data[0].loc_id : null;

        if (reqData.state) {
          query = `insert into user_state (user_id, state) values(${userDetails.id},"${reqData.state}") on duplicate key update user_id = ${userDetails.id}, state = "${reqData.state}";`;
          return sequelize.query(query, {
            type: sequelize.QueryTypes.INSERT
          })
        }

        return Promise.resolve([])
      })
      .then(data => {

        if (reqData.state) {
          query = `select state_id from user_state where user_id = ${userDetails.id} and state = "${reqData.state}"`;
          return sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
          })
        }

        return Promise.resolve([])
      })
      .then(data => {
        reqData.state_id = (data[0] && data[0].state_id) ? data[0].state_id : null;

        query = `call create_filter(${userDetails.id}, ${reqData.state_id}, "${reqData.user_type}", ${reqData.loc_id},"${reqData.event_date}","${reqData.event_time}" );`;
        return sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT
        })

      })
      .then(data => {
        console.log("data=", data);
        filterId = JSON.parse(JSON.stringify(data[0][0])).filter_id;
        if (reqData.tags) {
          query = "insert into tag (tag_name) values "
          reqData.tags.forEach((item, index) => {
            inClause += `'${item}',`
            if (index == 0) {
              query += `("${item}")`
            } else
              query += `, ("${item}")`
          })

          query += " on duplicate key update tag_name = values(tag_name)";
          console.log("query =", query);

          return sequelize.query(query, {
            type: sequelize.QueryTypes.INSERT
          })
        }
        return Promise.resolve([])
      })
      .then(data => {
        query = `delete from filter_tag where filter_id =${filterId}`;
        return sequelize.query(query, {
          type: sequelize.QueryTypes.DELETE
        })
      })
      .then(data => {
        console.log("inClause =", inClause);
        if (inClause) {
          query = `select tag_id, tag_name from tag where tag_name in (${inClause.substring(0, inClause.length-1)});`;
          return sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
          })
        }
        return Promise.resolve([])
      })
      .then(data => {
        console.log("data=", data);
        if (data && data.length!=0) {
          query = "insert into filter_tag (filter_id, tag_id) values "
          data.forEach((item, index) => {
            if (index == 0) {
              query += ` (${filterId}, ${item.tag_id})`
            } else
              query += ` ,(${filterId}, ${item.tag_id})`
          })
          query += "on duplicate key update filter_id = values(filter_id), tag_id = values(tag_id)"
          console.log("query =", query);
          return sequelize.query(query, {
            type: sequelize.QueryTypes.INSERT
          })
        }
        return Promise.resolve([])
      })
      .then(data => {
        data = {
          "filter_id": filterId
        }
        resolve(data)
      })
      .catch(err => {
        console.log("err=", err);
        reject("Error occured during adding filters. Please contact your system administrator!!")
      })

  })
}

const getStates = (userDetails) => {
  return new Promise((resolve, reject) => {
    let query = `select * from user_state where user_id = ${userDetails.id}`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        console.log("err=", err);
        reject("Error occured during getting states of the user. Please contact your system administrator!!")
      })
  })
}

const filters = {
  updateFilters,
  getStates
}

export {
  filters
}
