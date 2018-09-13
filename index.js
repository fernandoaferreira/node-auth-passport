const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const methodOver = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

/* PASSPORT BASIC */
//passport.use(require('./src/auth/basic'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOver('_method'))
app.use(passport.initialize());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/view'));

//app.get('*', passport.authenticate('basic', { session: false }));

require('./src/index')(app);

mongoose.connect('mongodb://localhost:27017/auth');
mongoose.Promise = global.Promise;

app.listen(9000, () => {
    console.log('Servidor ON-LINE');
})