
const express = require('express'); //yêu cầu thư viện express vừa cài để add vào chương trình
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const session = require('express-session');
require('dotenv/config');
const app = express(); //sử dụng toán tử call () để gọi express
const port = 3000

const route = require('./routes');
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ // middleware for form-data
    extended: true //nếu k thêm vào sẽ bị warning
}));
app.use(express.json()); // middleware for XMLHttpRequest, fetch, axios,… json data

// HTTP logger
// app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs'  // đổi lại đuôi .handlebars thành .hbs cho ngắn gọn
}));
app.set('view engine', 'hbs'); // set ứng dụng sử dụng view engine là handlebars
app.set('views', path.join(__dirname, 'resources', 'views')); // vì ta để views vào thư mục resources nên phải set lại



// app.get('/', (req, res) => {
//     res.render('login', {layout: 'authen.hbs'});
// })

// Route inits
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})