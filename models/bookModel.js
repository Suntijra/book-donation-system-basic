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
    const [rows, fields] = await db.execute('SELECT * FROM book');
    return [rows, fields];
  },
  findAllById: async (id) => {
    const [rows, fields] = await db.execute('SELECT * FROM book where id = ?',[id]);
    return [rows, fields];
  },
  insertBook: async (uid, book_name, date_time_in, img, type) => {
    const [rows, fields] = await db.execute(`insert into book (uid,book_name,date_time_in,img,type)
    VALUES (?, ?, ?, ?,?);`, [uid, book_name, date_time_in, img, type]);
    return [rows, fields];
  },
  updateById: async (id, date_time_out) => {
    const [rows, fields] = await db.execute(`UPDATE book SET status = 'export', date_time_out = ? WHERE id = ? ;`, [date_time_out, id]);
    return [rows, fields];

  }
};