const {createPool} = require("mysql");
const ErrorHandle = require("../utils/Errorhandler");

const pool = createPool({
  user: "root",
  host: "localhost",
  password: "",
  database: "gohoardi_goh",
  connectionLimit: 200,
  idleTimeoutMillis: 30000
});


const executeQuery = (query, arraParms, next) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        // handle error
        reject(err);
      } else {
        conn.changeUser({ database: arraParms });
        conn.query(query, async (err, data) => {
          if (err) {
            // handle error
            next(new ErrorHandle(err, `The query in which error occurred ${query}`, 206));
            reject(err);
          } else {
            // handle success
            resolve(data);
          }
          conn.end();
        });
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });
};

module.exports = {executeQuery};