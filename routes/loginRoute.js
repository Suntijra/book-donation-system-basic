var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const secret_key = 'book'

const loginController = require('../controllers/loginController')

router.post('/', loginController.login)

router.post('/register', loginController.register)

router.get('/protected', (req, res) => {
    console.log('protected')
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    // console.log('token header ',token)
    try {
        jwt_decoded(token)
        res.status(200).json({ message: 'good' })
    } catch (err) {
        console.log(err)
        res.status(200).json({ message: 'bad' })
    }
});
function jwt_decoded(token) {
    return jwt.verify(token, secret_key);
}

module.exports = router;