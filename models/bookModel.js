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
  findAllWithInfoEmployee: async () => {
    const [rows, fields] = await db.execute(`
    SELECT b.* , u.email, u.fname FROM book as b 
    left join user as u on u.id = b.uid`);

    return [rows, fields];
  },
  findAllWithInfoEmployee2: async () => {
    const [rows, fields] = await db.execute(`
    SELECT * FROM book as b 
    left join user as u2 on u2.id = b.ugetbook`);
    return [rows, fields];
  },
  findBookHistory: async () => {
    const [rows, fields] = await db.execute(`
    SELECT bh.id as bhbh_id ,bh.*,b.*,b.book_count - bh.pre_book_count as remain_book FROM book_history as bh LEFT JOIN book as b on b.id = bh.bh_id;
`);
    return [rows, fields];
  },
  findAllById: async (id) => {
    const [rows, fields] = await db.execute('SELECT * FROM book where id = ?', [id]);
    return [rows, fields];
  },

  insertBook: async (approve_id, uid, book_name, date_time_in, img, type, count) => {
    const [rows, fields] = await db.execute(`insert into book (approve_id,uid,book_name,date_time_in,img,type,book_count)
    VALUES (?, ?, ?, ?,?,?,?);`, [approve_id, uid, book_name, date_time_in, img, type, count]);
    return [rows, fields];
  },
  updateById: async (id, date_time_out) => {
    const [rows, fields] = await db.execute(`UPDATE book SET status = 'export', date_time_out = ? WHERE id = ? ;`, [date_time_out, id]);
    return [rows, fields];

  },
  updateUget: async (uget, id) => {
    // console.log('num_book',num_book)
    const [rows, fields] = await db.execute(` UPDATE book SET ugetbook = ? 
    WHERE id = ?;`, [uget, id]);
    return [rows, fields];

  },
  insert_request_book: async (bh_id, uid_get, pre_book_count) => {
    // console.log('num_book',num_book)
    const [rows, fields] = await db.execute(`INSERT INTO book_history (bh_id, uid_get, pre_book_count)
    VALUES (?,?,?);`, [bh_id, uid_get, pre_book_count]);
    return [rows, fields];

  },
  count_book: async () => {
    const [rows, fields] = await db.execute(`select type,COUNT(*) as count 
    FROM book
    GROUP by type;`)
    return [rows, fields];
  },
  count_book2: async () => {
    const [rows, fields] = await db.execute(`SELECT status, COUNT(*) as c FROM book
    GROUP by status;`)
    return [rows, fields];
  }
};