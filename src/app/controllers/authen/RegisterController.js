const User = require('../../models/User');
const bcrypt = require('bcrypt');
require('dotenv/config');
const mailer = require('../../utils/mailer');

exports.showRegisterForm = (req, res) => {
    res.render('authen/register', { layout: 'authen.hbs' });
}

exports.showSuccessForm = (req, res) => {
    if (req.query.status === 'verifySuccess') {
        res.render('authen/verifySuccess', { layout: 'authen.hbs', message: "Xác minh thành công!!!" });
    } else if (req.query.status === 'changePasswordSuccess') {
        res.render('authen/verifySuccess', { layout: 'authen.hbs', message: "Đổi mật khẩu thành công!!!" });
    }
}

exports.showVerifyForm = (req, res, next) => {
    const { email, token } = req.query;
    // Kiểm tra xem email và token có tồn tại không
    if (!email || !token) {// Nếu email hoặc token không tồn tại
        res.render('authen/verify', { layout: 'authen.hbs' });
    } else {
        next();
    }
}

exports.register = (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        User.findByEmail(email, (err, user) => {
            if (err || user) {
                // A user with that email address does not exists
                const conflictError = 'User credentials are exist.';
                res.render('auth/register', { email, password, conflictError });
            }
        })

        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashed) => {
            // Create a User
            const user = new User({
                email: email,
                password: hashed
            });
            User.create(user, (err, user) => {
                if (!err) {
                    bcrypt.hash(user.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
                        console.log(`${process.env.APP_URL}/verify?email=${user.email}&token=${hashedEmail}`);
                        mailer.sendMailRegister(user, "Xác minh Email", hashedEmail)
                    });

                    res.redirect('/verify');
                }
            })
        });
    } else {
        const conflictError = 'User credentials are exist.';
        res.render('authen/register', { email, password, conflictError });
    }
}




exports.verify = (req, res) => {

    bcrypt.compare(req.query.email, req.query.token, (err, result) => {
        if (result == true) {
            User.verify(req.query.email, (err, result) => {
                if (!err) {
                    res.redirect('/verifySuccess?status=verifySuccess');
                } else {
                    console.log(err);
                    // res.redirect('/500');
                }
            });
        } else {
            console.warn(err);
            // res.redirect('/404');
        }
    })
}

