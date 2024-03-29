const userModel = require('../models/usersModels')
const MD5 = require('md5')
var jwt = require('jsonwebtoken');
const { token } = require('morgan');
const secret_key = 'book'

function jwt_decoded(token) {
    return jwt.verify(token, secret_key);
}
function jwt_generate_token(data){
    return jwt.sign(data, secret_key);
}

module.exports = {
    login: async (req, res) => {
        try {
            const username = req.body.username
            const password = req.body.password
            const [rows, fields] = await userModel.checkUserInSystemByUserAndPwd(username, MD5(password))
            let token = '';
            let user = rows[0]
            console.log('check login')
            if (user) {
                token = jwt_generate_token(user)
                // console.log('token : ', token)
                res.status(200).json({message : 'success' , token : token });
            } else {
                res.status(200).json({ message: 'no user in system' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    register: async (req, res) => {
        try {
            console.log('test')
            const fname = req.body.fname
            const lname = req.body.lname
            const email = req.body.email
            const phone_number = req.body.phone_number
            const line_id = req.body.line_id
            const username = req.body.username
            const password = MD5(req.body.password)
            if (fname && lname && email && phone_number && line_id && username && password) {
                const [user, fields] = await userModel.checkUserInSystemByUserAndPwd(username, password)
                console.log(user)
                if (user[0]) {
                    // username already exists
                    res.status(200).json({ message: 'username already exists' });
                } else {
                    // case register success
                    const [rows, fields] = await userModel.insertUser(username, password, fname, lname, email, phone_number, line_id)
                    console.log('rows', rows, '\n' + "fields", fields)
                    res.status(200).json({ message: 'success' })
                }
            } else {
                res.status(400).json({ message: 'ข้อมูลถูกส่งมาไม่ถูกต้อง', code: -1 });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', code: -1 });
        }
    }
}