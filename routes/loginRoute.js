var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController')

router.post('/',loginController.login)

router.post('/register',loginController.register)


module.exports = router;