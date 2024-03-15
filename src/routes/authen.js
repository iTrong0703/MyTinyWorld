
const express = require('express')

// var app = express()  // không cần vì nó đã được truyền vào bên file index.js r
const router = express.Router()
const forgotPassword = require('../app/controllers/authen/ForgotPasswordController');
const registerController = require('../app/controllers/authen/RegisterController');
const loginController = require('../app/controllers/authen/LoginController');
const authenMiddleware = require('../app/middlewares/AuthenMiddleware');



// dùng get do nó là cấp nhỏ hơn, chỉ file index mới dùng use
router.get('/login', authenMiddleware.isAuth, loginController.showLoginForm)
    .post('/login', loginController.login)
    .get('/register', authenMiddleware.isAuth, registerController.showRegisterForm)
    .post('/register', registerController.register)
    .get('/reset', forgotPassword.showForgotForm)
    .post('/reset/email', forgotPassword.sendResetLinkEmail)
    .get('/reset/:email', forgotPassword.showResetForm)
    .post('/reset', forgotPassword.reset)

module.exports = router;
