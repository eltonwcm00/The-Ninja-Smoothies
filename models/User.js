const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

// Mongoose Hooks 
/* Fire a function AFTER the docs are saved = 'save' into the db */
/* After fire the doc, next() to move on to the next middleware */ 
userSchema.post('save', function(doc, next) {
     console.log('New user was created & saved', doc);
    next();
})

/* Fire a function BEFORE the docs are saved = 'save' into the db */
userSchema.pre('save', async function(next) {
    // console.log('User is about to be created & saved', this);

    // Hashing passwords
    /* Generating salts and password hashing  */
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema); /* First argument must be a prural of the mongo collection */

module.exports = User;