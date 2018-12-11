import
sequelize
from '../models'

const axios = require('axios')


const updateFilters = (reqData, userDetails) => {
  return new Promise((resolve, reject) => {
    let inClause = "",
      filterId,
      query;
    if (reqData.area_name) {
      reqData.area_name = `'${reqData.area_name}'`
    }
    let promise = Promise.resolve([]);

    if (reqData.area_name) {
      promise = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${reqData.area_name}&key=AIzaSyA6J8gVPzYgE8TK0oqEhjb2j81Eg1IoRVs`)
      console.log(`geolocation api = https://maps.googleapis.com/maps/api/geocode/json?address=${reqData.area_name}&key=AIzaSyA6J8gVPzYgE8TK0oqEhjb2j81Eg1IoRVs`);
    }

    promise
      .then(data => {
        console.log("geolocation data===", data);

        if (data && data.data && data.data.results && data.data.results[0] && data.data.results[0].geometry && data.data.results[0].geometry.location && data.data.results[0].geometry.location.lat && data.data.results[0].geometry.location.lng) {
          reqData.latitude = data.data.results[0].geometry.location.lat.toFixed(8);
          reqData.longitude = data.data.results[0].geometry.location.lng.toFixed(8);
          console.log("reqData.latitude ==", reqData.latitude);
          console.log("reqData.longitude ==", reqData.longitude);
        }

        if (reqData.latitude && reqData.longitude && reqData.area_name) {
          query = `insert into location (area_name, latitude, longitude) values(${reqData.area_name},${reqData.latitude},${reqData.longitude}) on duplicate key update area_name = ${reqData.area_name}, latitude = ${reqData.latitude}, longitude = ${reqData.longitude};`;
          return sequelize.query(query, {
            type: sequelize.QueryTypes.INSERT
          })
        }
        return Promise.resolve([]);
      })
      .then(data => {
        console.log("data=", data);
        if (reqData.latitude && reqData.longitude) {
          query = `select loc_id from location where latitude = ${reqData.latitude} and longitude = ${reqData.longitude};`;
          return sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
          })
        }

        return Promise.resolve([]);
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

        if (reqData.event_date) {
          reqData.event_date = `"${reqData.event_date}"`;
        }

        if (reqData.event_time) {
          reqData.event_time = `"${reqData.event_time}"`;
        }

        query = `call create_filter(${userDetails.id}, ${reqData.state_id}, "${reqData.user_type}", ${reqData.loc_id},${reqData.event_date},${reqData.event_time} );`;
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
        if (data && data.length != 0) {
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
    let query = `select f.filter_id ,us.state, lo.area_name, f.user_type, f.event_date, f.event_time, group_concat(tag_name) as tags from filter f
left outer join user_state us
on f.state_id = us.state_id
left outer join location lo
on f.loc_id=lo.loc_id
left outer join filter_tag ft
on f.filter_id=ft.filter_id
left outer join tag t
on ft.tag_id = t.tag_id
where f.user_id =${userDetails.id}
group by f.filter_id
`;
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
