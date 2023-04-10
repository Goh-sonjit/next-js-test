// const mysql = require("mysql");
// const ErrorHandle = require("../utils/Errorhandler");


// const db_config = {
//   user: "root",
//   host: process.env.DataBASEHOST,
//   password: "",
//   database: "gohoardi_goh",
// };

// var connection;
// function handleDisconnect() {
//   connection = mysql.createConnection(db_config); // Recreate the connection, since
//   // the old one cannot be reused.
//   connection.connect(function (err) {
//     // The server is either down
//     if (err) {
//       // or restarting (takes a while sometimes).
//      return ("error when connecting to db:", err);
//       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//     } // to avoid a hot loop, and to allow our node script to
//   }); // process asynchronous requests in the meantime.
//   // If you're also serving http, display a 503 error.
//   connection.on("error", function (err) {
//     return ("db error", err);
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//       // Connection to the MySQL server is usually
//       handleDisconnect(); // lost due to either server restart, or a
//     } else {
//       // connnection idle timeout (the wait_timeout
//       throw err; // server variable configures this)
//     }
//   });
// }

// handleDisconnect();
// // In your code i am missing the parts after connection = mysql.createConnection(db_config);

// //  answered Jun 17, 2022 by N


// const executeQuery = (query, arraParms, next) =>{
//   return new Promise((resolve,reject) => {
//     connection.changeUser({ database: arraParms });
//     if(query){

//       connection.query(query,async(err, data) => {
//         if(err){
//           next(new ErrorHandle(err, `The query in which error occurred ${query}`,206))
//           reject(err)
//         }
//         return resolve(data)
//       })
//     }
//   })
// }


// module.exports = {executeQuery};



const mysql = require("mysql");


const db_config = {
  user: "root",
  host: "localhost",
  password: "",
  database: "gohoardi_goh",
};

var connection;
function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.
  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
     return ("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function (err) {
    return ("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();
// In your code i am missing the parts after connection = mysql.createConnection(db_config);

//  answered Jun 17, 2022 by N

module.exports = connection;




















