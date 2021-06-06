const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true,
        unique: true,  /* No 2nd sign up */
        lowercase: true
    },
    
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const User = mongoose.model('user', userSchema); /* First argument must be a prural of the mongo collection */

module.exports = User;