var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
let book_controller = require('../controllers/bookController')
const secret_key = 'book'
function jwt_decoded(token) {
    return jwt.verify(token, secret_key);
}
const auth = require('../middleware/auth')

router.post('/send', auth, book_controller.verifyBook)

module.exports = router;