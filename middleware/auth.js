const jwt = require('jsonwebtoken');
secret_key = 'book'

function auth(req, res, next) {
    const token = req.body.token
    try {
        if(!token){
            res.status(500).json({ message: 'no token' });
        }else{
            jwt_decoded(token)
            next()
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });

    }
}
function jwt_decoded(token) {
    return jwt.verify(token, secret_key);
}
module.exports = auth;
