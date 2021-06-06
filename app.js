const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.static('public'));
/* pass the json data into the request handler */
app.use(express.json());

// View engine
app.set('view engine', 'ejs');

// Database connection
const dbURI = 'mongodb+srv://elton:1234@ninjasmoothies.lyddb.mongodb.net/ninjasmoothies?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoutes);
