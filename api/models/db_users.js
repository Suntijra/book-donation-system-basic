const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book_donation_center'
});

class Users {
    static async getAll() {
        const conn = await pool.getConnection();

        const [rows, fields] = await conn.execute('SELECT * FROM user');
        return rows
    }
}
module.exports = Users
