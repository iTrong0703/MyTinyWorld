
const express = require('express')
// var app = express()  // không cần vì nó đã được truyền vào bên file index.js r
const router = express.Router()
const authenMiddleware = require('../app/middlewares/AuthenMiddleware');
const homeController = require('../app/controllers/HomeController');

// dùng get do nó là cấp nhỏ hơn, chỉ file index mới dùng use
router.get('/', authenMiddleware.loggedin, homeController.index); //gọi phương thức index của class SiteController



module.exports = router;
