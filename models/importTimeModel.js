const mysql = require('mysql2');
const dbConfig = require('../configs/db_mysql');
// console.log(dbConfig)
const db = mysql.createConnection(dbConfig).promise();

// ensure the connection is established successfully
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database successfully!');
  }
});

module.exports = {
  findAll: async () => {
    const [rows, fields] = await db.execute('SELECT * FROM import_time');
    return [rows, fields];
  },

  insert_import_time: async (uid, email, appointment_date, journal_num, book_num, phone) => {
    const [rows, fields] = await db.execute(
      `INSERT INTO import_time 
      (uid, email, appointment_date, journal_num, book_num,phone) 
      VALUES (?, ?, ?, ?, ?, ?)`, [uid, email, appointment_date, journal_num, book_num, phone]);
    return [rows, fields]
  },
  findAllandJoinImportTime: async () => {
    const [rows, fields] = await db.execute(`SELECT it.id, user.fname ,user.lname , user.email 
    ,user.phoneno,it.phone,it.status ,it.appointment_date,it.journal_num,it.book_num FROM user
    INNER JOIN import_time AS it
    ON it.uid = user.id;`);
    return [rows, fields];
  },
  updateStatus: async (id) => {
    const [rows, fields] = await db.execute(
      `UPDATE import_time
      SET status = "approved"
      WHERE id = ?;`, [id]);
    return [rows, fields]
  }
};