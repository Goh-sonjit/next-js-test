const {createPool} = require("mysql");
const ErrorHandle = require("../utils/Errorhandler");

const db_config = createPool({
  user: "root",
  host: "localhost",
  password: "",
  database: "gohoardi_goh",
});


const executeQuery = (query, arraParms, next) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        // handle error
        reject(err);
      } else if(query){
        conn.changeUser({ database: arraParms });
        conn.query(query, async (err, data) => {
          if (err) {
            // handle error
            next(new ErrorHandle(err, `The query in which error occurred ${query}`, 206));
           return reject(err);
          } else {
            // handle success
           return resolve(data);
          }
          conn.release();
        });
      }
    })
  })
}

module.exports = {executeQuery};