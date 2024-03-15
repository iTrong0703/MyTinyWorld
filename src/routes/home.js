
const express = require('express')
// var app = express()  // không cần vì nó đã được truyền vào bên file index.js r
const router = express.Router()
const authenMiddleware = require('../app/middlewares/AuthenMiddleware');
const homeController = require('../app/controllers/HomeController');

// dùng get do nó là cấp nhỏ hơn, chỉ file index mới dùng use
router.get('/', authenMiddleware.loggedin, homeController.index); // nếu đăng nhập/đăng ký thành công thì vào đây



module.exports = router;
