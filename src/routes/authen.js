
const express = require('express')

// var app = express()  // không cần vì nó đã được truyền vào bên file index.js r
const router = express.Router()

const loginController = require('../app/controllers/authen/LoginController');
const authenMiddleware = require('../app/middlewares/AuthenMiddleware');



// dùng get do nó là cấp nhỏ hơn, chỉ file index mới dùng use
router.get('/', authenMiddleware.isAuth, loginController.showLoginForm)
    .post('/', loginController.login);



module.exports = router;
