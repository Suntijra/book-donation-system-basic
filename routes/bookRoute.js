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

router.get("/findall",book_controller.findAll)
router.post("/update/id",auth,book_controller.updateStatusByItId)
router.get("/findall/book",book_controller.findAllBook)
router.post("/approved",auth,book_controller.approved)
router.post("/update/status",book_controller.updateStatus)
router.post("/requsets",book_controller.requestbook)

module.exports = router;