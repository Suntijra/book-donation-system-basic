const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.body.token
    try {
        if(!token){
            res.redirect('/login.html')
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
