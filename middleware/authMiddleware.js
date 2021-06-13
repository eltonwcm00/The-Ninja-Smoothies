const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {

    // Grab token from the cookies (from the google dev)
    const token = req.cookies.jwt;

    // Check if JWT exists & is verified
    if (token) {
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            } 
            else {
                console.log(decodedToken);
                // Carry on with the handler function for the protecting routes
                next();
            } 
        })
    } 
    else {
        res.redirect('/login');
    }
}

module.exports = { requireAuth };