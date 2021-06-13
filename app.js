const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const { requireAuth } = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json()); /* pass the json data into the request handler */
app.use(cookieParser());

// View engine
app.set('view engine', 'ejs');

// Database connection
const dbURI = 'mongodb+srv://elton:1234@ninjasmoothies.lyddb.mongodb.net/ninjasmoothies?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Routes *requireAuth = protecting routes
app.get('/', requireAuth, (req, res) => res.render('home', { title: 'Home' }));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies', { title: 'Smoothies' }));

app.use(authRoutes);

// Cookies Primer
