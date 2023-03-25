const mysql = require('mysql2');
const dbConfig = require('../configs/db_mysql');
// console.log(dbConfig)
const db = mysql.createConnection(dbConfig).promise();

// ensure the connection is established successfully
db.connect((err) => {
  2
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database successfully!');
  }
});

module.exports = {
  findAll: async () => {
    const [rows,fields] = await db.execute('SELECT * FROM user');
    return [rows,fields];
  },
  checkUserInSystemByUserAndPwd: async (user, pwd) => {
    const [rows,fields] = await db.execute(`SELECT id,fname,lname,email,phoneno,lineID,level FROM user where username = ? and password = ?`, [user, pwd]);
    return [rows,fields]
  },
  insertUser: async (user, pwd, fname, lname, email, phone, line_id) => {
    const [rows,fields] = await db.execute(
      `INSERT INTO user 
      (username, password, fname, lname, email, phoneno, lineID) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`, [user, pwd, fname, lname, email, phone, line_id]);
      return [rows,fields]
  }
};