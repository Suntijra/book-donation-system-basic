var jwt = require('jsonwebtoken');
const secret_key = 'book'
const MD5 = require('md5')
// import model
let userModel = require('../models/usersModels')
function jwt_decoded(token) {
    return jwt.verify(token, secret_key);
}
function jwt_generate_token(data) {
    return jwt.sign(data, secret_key);
}
module.exports = {
    loginAdmin: async (req, res) => {
        const { user, pwd } = req.body
        try {
            if (user, pwd) {
                const [row, fields] = await userModel.findAdminUser(user, MD5(pwd))
                if (row[0]) {
                    let get_token = jwt_generate_token(row[0])
                    res.status(200).json({ message: "success", token: get_token });
                } else {
                    res.status(200).json({ message: "no data" });
                }
            } else {
                res.status(400).json({ message: 'username or password something wrong' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}