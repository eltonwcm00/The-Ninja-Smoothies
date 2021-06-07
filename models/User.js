const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: [true, 'Please enter an email'], // Custom error message
        unique: true,  /* No 2nd sign up */
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});

const User = mongoose.model('user', userSchema); /* First argument must be a prural of the mongo collection */

module.exports = User;