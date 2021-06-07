const User = require('../models/User');

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
        const errors = handleErrors(err);
        res.status(400).json( {errors} );
        // res.status(400).send('Error, user is not created'); 
    }
}

module.exports.login_post = async (req, res) => {
    
    const { email, password } = req.body;
    
    console.log(email, password);
    res.send('User login');
}