const userModel = require('../models/usersModels')
const MD5 = require('md5')

module.exports = {
    login: async (req, res) => {
        try {
            const username = req.body.username
            const password = req.body.password
            const [rows, fields] = await userModel.checkUserInSystemByUserAndPwd(username,MD5(password))
            console.log('check login')
            console.log(rows)
            res.status(200).json(rows);
        } catch {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}