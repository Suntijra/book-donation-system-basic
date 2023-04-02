var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const secret_key = 'book'
let AdminController = require('../controllers/adminController')
function jwt_decoded(token) {
    return jwt.verify(token, secret_key);
}
router.post('/', AdminController.loginAdmin)
router.get('/protected', (req, res) => {
    console.log('admin protected')
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    // console.log('token header ',token)
    try {
        let decode = jwt_decoded(token)
        if (decode.level === "admin") {
            res.status(200).json({ message: 'good' })
        } else {
            res.status(200).json({ message: 'bad' })
        }

    } catch (err) {
        console.log(err)
        res.status(200).json({ message: 'bad' })
    }
});

module.exports = router