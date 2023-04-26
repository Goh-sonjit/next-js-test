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


const executeQuery = (query, arraParms, next) =>{
return new Promise((resolve,reject) => {
    db_config.getConnection((err, conn) =>{
      if(err){
      }else if(query){
      conn.changeUser({ database: arraParms });
      conn.query(query,async(err, data) => {
        if(err){
          next(new ErrorHandle(err, `The query in which error occurred ${query}`,206))
        return reject(err)
        }
        return resolve(data)
      })
      conn.end();
      }
    })
  })
  .catch((err) => {
    console.error(err);
  });
};

module.exports = {executeQuery};