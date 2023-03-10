var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
router.get('/x', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all',userController.getAllUsers)

module.exports = router;
