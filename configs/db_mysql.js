require('dotenv').config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const pool = {
    host: 'localhost',
    user: 'root',
    database: 'book_donation_center',
}

module.exports = pool;
