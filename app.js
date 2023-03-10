var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session');
// import router 
var usersRouter = require('./routes/usersRoute');
// let adminRouter = require('./routes/adminRoute')

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())// parse application/json
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60 * 60 * 1000 }
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
// app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/login-system', loginSystem)
// app.use('/admin', adminRouter)
module.exports = app;
