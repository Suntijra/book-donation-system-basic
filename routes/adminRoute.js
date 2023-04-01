var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
let AdminController = require('../controllers/adminController')
let auth = require('../middleware/auth')
router.post('/', auth, AdminController.loginAdmin)

module.exports = router