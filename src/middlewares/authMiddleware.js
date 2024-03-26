const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv/config');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/signin');
            } else {
                // Token hợp lệ, kiểm tra xác thực email của người dùng
                const user = await User.findById(decodedToken.id);
                if (!user.isVerified) {
                    res.render('authen/verifyEmail', { layout: 'authen.hbs', title: "Email chưa xác thực!!!" });
                } else {
                    // Người dùng đã xác thực email, tiếp tục
                    next();
                }
            }
        });
    } else {
        res.redirect('/signin');
    }
};

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};




module.exports = { requireAuth, checkUser };