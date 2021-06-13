const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protecting Routes
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

// Check Current User
const checkUser = (req, res, next) => {
    
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.userVariable = null;
                next();
            } 
            else {
                console.log(decodedToken);
                
                // Find the JWT payload (id) to extract user info from the db
                let user = await User.findById(decodedToken.id);
                // Found the ID, inject into view (res.locals.anyName)
                res.locals.userVariable = user;
                next();
            } 
        })
    }
    else {
        res.locals.userVariable = null;
        next();
    }
}

module.exports = 
    { requireAuth, 
      checkUser };