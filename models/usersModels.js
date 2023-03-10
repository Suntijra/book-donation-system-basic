const mysql = require('mysql2');
const dbConfig = require('../configs/db_mysql');
console.log(dbConfig)
const db = mysql.createConnection(dbConfig).promise();

// ensure the connection is established successfully
db.connect((err) => {2
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database successfully!');
  }
});

module.exports = {
    findAll: async () => {
      const [rows] = await db.execute('SELECT * FROM user');
      return rows;
    },
    checkUserInSystemByUserAndPwd : async (user , pwd) => {
      const [rows] = await db.execute(`SELECT * FROM user where username = ? and password = ?`,[user , pwd]);
      return rows;
    }
  };