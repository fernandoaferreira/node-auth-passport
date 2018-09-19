const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const methodOver = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const app = express();

/* PASSPORT BASIC */
//passport.use(require('./src/auth/basic'));
//app.get('*', passport.authenticate('basic', { session: false })); colocar depois da view

/* PASSPORT LOCAL - precisa passar o passport importado na App para as controllers*/
require('./src/auth/local')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOver('_method'));

//Importante manter essa ordem de configuração
app.use(session({ secret: '123456', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//Termino configuração Passport com session

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/view'));

require('./src/index')(app, passport);

mongoose.connect('mongodb://localhost:27017/auth');
mongoose.Promise = global.Promise;

app.listen(9000, () => {
    console.log('Servidor ON-LINE');
})