var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
// const session = require('express-session');
// import router ;
let loginSystem = require('./routes/loginRoute')
let bookRoute = require('./routes/bookRoute')
let adminRoute = require('./routes/adminRoute')
//import middleware
// let auth = require('./middleware/auth')

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())// parse application/json
app.set('trust proxy', 1) // trust first proxy

// app.use(session({
//   secret: 'mysecretkey',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false, maxAge: 60 * 60 * 1000 }
// }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/login', loginSystem)
app.use('/api/book', bookRoute)
app.use('/api/admin',adminRoute)


module.exports = app;
