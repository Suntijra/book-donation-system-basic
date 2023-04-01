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
      VALUES (?, ?, ?, ?, ?, ?)`, [uid,email, appointment_date, journal_num, book_num, phone]);
    return [rows, fields]
  }
};