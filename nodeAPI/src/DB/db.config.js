const mySql = require('mysql');

var enviroment_local_other_server = {
    Dbconnection: mySql.createPool({
      connectionLimit : 100,
      host            : 'localhost',
      user            : 'root',
      password        : '',
      database        : 'mh_board',
      acquireTimeout: 1000000
    }),
    // ;
    // Dbconnection: mysql.createConnection({
    //   database: "phpexcep_mana360_dev",
    //   user: "phpexcep_mana",
    //   password: "zU191&&r6id3",
    //   host: "18.224.152.226",
    //   acquireTimeout: 1000000,
    //   // port: 3306
    // }),    
    port: 4000
  };
// const pool = mySql.createPool({
//     connectionLimit: 100,
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     acquireTimeout: 1000000,
//     database: 'mh_board'
// });

// pool.getConnection((err, connection) => {
//     if (!err) {
//         console.log('DB Connected Successfully!');
//         // pool.releaseConnection();
//     } else {
//         console.log(err);
//     }
// })

module.exports = enviroment_local_other_server;
