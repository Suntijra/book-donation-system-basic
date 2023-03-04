var express = require('express');
var router = express.Router();
const User = require('../models/db_users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/getuser', async (req,res)=>{
  const users = await User.getAll();
    res.status(200).json({
      data : users
    })
} )

module.exports = router;
