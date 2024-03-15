const User = require('../../models/User');
const bcrypt = require('bcrypt');
const mailer = require('../../utils/mailer');

exports.showForgotForm = (req, res) => {
    res.render('authen/resetPass/email');
}

exports.sendResetLinkEmail = (req, res) => {
    if (!req.body.email) {
        res.redirect('/reset')
    } else {
        User.findByEmail(req.body.email, (err, user) => {
            if (!user) {
                res.redirect('/reset')
            } else {
                bcrypt.hash(user.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
                    mailer.sendMail(user.email, "Reset password", `<a href="${process.env.APP_URL}/reset/${user.email}?token=${hashedEmail}"> Reset Password </a>`)
                    console.log(`${process.env.APP_URL}/reset/${user.email}?token=${hashedEmail}`);
                })
                res.redirect('/reset?status=success')
            }
        })
    }
}

exports.showResetForm = (req, res) => {
    if (!req.params.email || !req.query.token) {
        res.redirect('/reset')
    } else {
        res.render('authen/resetPass/reset', { email: req.params.email, token: req.query.token })
    }
}

exports.reset = (req, res) => {
    const { email, token, password } = req.body;
    console.log(email, token, password);
    if (!email || !token || !password) {
        res.redirect('/reset');
    } else {
        bcrypt.compare(email, token, (err, result) => {
            console.log('compare', result);
            if (result == true) {
                bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedPassword) => {
                    User.resetPassword(email, hashedPassword, (err, result) => {
                        if (!err) {
                            res.redirect('/login');
                        } else {
                            res.redirect("/500");
                        }
                    })
                })
            } else {
                res.redirect('/reset');
            }
        })
    }
}