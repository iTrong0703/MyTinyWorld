
const express = require('express'); //yêu cầu thư viện express vừa cài để add vào chương trình
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express(); //sử dụng toán tử call () để gọi express
const port = 3000


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



app.get('/', (req, res) => {
    res.render('home');
})

app.get('/news', (req, res) => {
    res.render('news');
})

app.get('/search', (req, res) => {
    console.log(req.query.q);
    res.render('search');
})

app.post('/search', (req, res) => {
    console.log(req.body);
    res.send('');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})