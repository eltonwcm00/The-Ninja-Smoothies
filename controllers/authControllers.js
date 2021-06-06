const User = require('../models/User');

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
   
    /* API testing through Postman with dummy inputs*/
    const { email, password } = req.body;

    try {
        // Asynchronous & Await method to resolve the Promises 
        const user = await User.create({ email, password });
        res.status(201).json(user); /* Send to the db as in a json format */
    
    } catch (err) {
        console.log(err);
        res.status(400).send('Error, user is not created'); 
    }
}

module.exports.login_post = async (req, res) => {
    
    const { email, password } = req.body;
    
    console.log(email, password);
    res.send('User login');
}