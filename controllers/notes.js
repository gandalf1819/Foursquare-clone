import
sequelize
from '../models';

const createNotes = (reqData, userDetails) => {
  return new Promise((resolve, reject) => {
    let inClause = "",
      noteId;
    if (reqData.area_name) {
      reqData.area_name = `'${reqData.area_name}'`
    }
    let query = `insert into location (area_name, latitude, longitude) values(${reqData.area_name},${reqData.latitude},${reqData.longitude}) on duplicate key update area_name = ${reqData.area_name}, latitude = ${reqData.latitude}, longitude = ${reqData.longitude};`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.INSERT
      })
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
        if (reqData.end_date) {
          reqData.end_date = `"${reqData.end_date}"`
        }
        if (reqData.end_time) {
          reqData.end_time = `"${reqData.end_time}"`
        }
        query = `call create_note(${userDetails.id}, ${reqData.loc_id}, "${reqData.note}", "${reqData.shared_with}",${reqData.radius_of_interest},"2018-12-04","${reqData.start_date}",${reqData.end_date}, "${reqData.start_time}", ${reqData.end_time}, ${reqData.interval},"${reqData.are_comments_allowed}" );`;
        return sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT
        })

      })
      .then(data => {
        console.log("data=", data);
        noteId = JSON.parse(JSON.stringify(data[0][0])).note_id;
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
      })
      .then(data => {
        console.log("inClause =", inClause);
        query = `select tag_id, tag_name from tag where tag_name in (${inClause.substring(0, inClause.length-1)});`;
        return sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT
        })

      })
      .then(data => {
        console.log("data=", data);
        query = "insert into note_tag (note_id, tag_id) values "
        data.forEach((item, index) => {
          if (index == 0) {
            query += ` (${noteId}, ${item.tag_id})`
          } else
            query += ` ,(${noteId}, ${item.tag_id})`
        })
        console.log("query =", query);
        return sequelize.query(query, {
          type: sequelize.QueryTypes.INSERT
        })
      })
      .then(data => {
        resolve("Note Created Successfully!!")
      })
      .catch(err => {
        console.log("err=", err);
        reject("Error occured during creating notes. Please contact your system administrator!!")
      })
  })
}

  const notes = {
    createNotes
  }


export {
  notes
}
