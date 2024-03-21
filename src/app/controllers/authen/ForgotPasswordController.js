const User = require('../../models/User');
const bcrypt = require('bcrypt');
const mailer = require('../../utils/mailer');

exports.showForgotForm = (req, res) => {

    if (!req.query.status) {
        console.log('status: ' + req.query.status);
        res.render('authen/forgotPassword/submitEmail', { layout: 'authen.hbs' });
    } else if (req.query.status === 'success') {
        console.log('status: ' + req.query.status);
        res.redirect('/verify');
    }
}




exports.showResetForm = (req, res) => {
    if (!req.params.email || !req.query.token) {
        res.redirect('/forgot')
    } else {
        res.render('authen/forgotPassword/changePass', { layout: 'authen.hbs', email: req.params.email, token: req.query.token });
    }
}

exports.sendResetLinkEmail = (req, res) => {
    if (!req.body.email) {
        res.redirect('/forgot')
    } else {
        User.findByEmail(req.body.email, (err, user) => {
            if (!user) {
                res.redirect('/forgot')
            } else {
                bcrypt.hash(user.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
                    mailer.sendMailForgotPass(user, "Đổi mật khẩu", hashedEmail)
                    console.log(`${process.env.APP_URL}/forgot/${user.email}?token=${hashedEmail}`);
                })
                res.redirect('/forgot?status=success')
            }
        })
    }
}


exports.reset = (req, res) => {
    const { email, token, password } = req.body;
    console.log(email, token, password);
    if (!email || !token || !password) {
        res.redirect('/forgot');
    } else {
        bcrypt.compare(email, token, (err, result) => {
            console.log('compare', result);
            if (result == true) {
                bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedPassword) => {
                    User.resetPassword(email, hashedPassword, (err, result) => {
                        if (!err) {
                            res.redirect('/verifySuccess?status=changePasswordSuccess');
                        } else {
                            res.redirect("/500");
                        }
                    })
                })
            } else {
                res.redirect('/forgot');
            }
        })
    }
}