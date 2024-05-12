const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');

const axios = require('axios');
const session = require('express-session');
const app = express();
const db = require('./config/db');
const route = require('./routes');
require('dotenv/config');

// Connect to DB
db.connect(app);

// Session
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    // middleware for form-data
    extended: true, //nếu k thêm vào sẽ bị warning
  })
);
app.use(express.json()); // middleware for XMLHttpRequest, fetch, axios,… json data
app.use(cookieParser());

// HTTP logger
// app.use(morgan('combined'))
const helpers = {
    eq: function(a, b, options) {
        return a === b ? true : false;
    }
};
//Template engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs', // đổi lại đuôi .handlebars thành .hbs cho ngắn gọn
    helpers: helpers
  })
);
app.set('view engine', 'hbs'); // set ứng dụng sử dụng view engine là handlebars
app.set('views', path.join(__dirname, 'resources', 'views')); // vì ta để views vào thư mục resources nên phải set lại

// Route inits
route(app);
