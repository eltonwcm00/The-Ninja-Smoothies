const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Custom error handler
const handleErrors = (err) => {
    
     /* Validation errors 
       when it matches sentence 'user validation failed
       message */
       
    /* Taken from the err.message in the format of :
       {
           validator: [Function],
           message: '',
           type: '',
           path: '',
           value: ''
       }
    */
    
    // Handle errors
    console.log(err.message, err.code);
    let errors = { email: '', password: ''}; /* '', empty at the beginning to assign error messages */

    // Duplicate error code
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }

    // Validate errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(( {properties} ) => {
            // console.log(error.properties);
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

// Create JWT
const JWTmaxAge = 3 * 24 * 60 * 60;
const createToken = (id) => { /* id = from mongodb auto id assignment */
    return jwt.sign({id}, 'net ninja secret', { /* {payload}, 'secret' */
      expiresIn: JWTmaxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup', { title: 'Sign in' });
}

module.exports.login_get = (req, res) => {
    res.render('login', { title: 'Login' });
}

module.exports.signup_post = async (req, res) => {
   
    /* API testing through Postman with dummy inputs*/
    const { email, password } = req.body;

    try {
        // Asynchronous & Await method to resolve the Promises 
        const user = await User.create({ email, password });
        
        // Assign JWT and parse into Cookie -> bind to user_.id
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: JWTmaxAge * 1000});
        
        res.status(201).json({user: user._id}); /* Send JSON responses to the db as in a json format */  

    } catch (err) {
        const errors = handleErrors(err);
        
        res.status(400).json( {errors} );
        // res.status(400).send('Error, user is not created'); 
    }
}

module.exports.login_post = async (req, res) => {
    
    const { email, password } = req.body;

    try {

        // Custom static method, from User.js
        const user = await User.login(email, password);
        res.status(200).json({user: user._id});

    } catch(err) {

        res.status(400).json({});

    }
}