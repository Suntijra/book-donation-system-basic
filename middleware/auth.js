const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.body.token
    try {
        if (!token) {
            // Check if this is a login request
            if (
                req.path === '/api/login/register'
                && req.path === '/api/login'
            ) {
                next()
            } else {
                jwt_decoded(token)
            }
        } else {
            jwt_decoded(token)
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });

    }
}
function jwt_decoded(token) {
    return jwt.verify(token, secret_key);
}
module.exports = auth;
