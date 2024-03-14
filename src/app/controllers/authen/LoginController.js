
const User = require('../../models/User');
const bcrypt = require('bcrypt');

exports.showLoginForm = (req, res) => {
    console.log('showLoginForm');
    res.render('authen/login', { layout: 'authen.hbs' });
}

exports.login = (req, res) => {

    const { email, password } = req.body;

    if (email && password) {
        User.findByEmail(email, (err, user) => {
            if (!user) {
                console.log('Đăng nhập khôngg thành công');
                res.redirect('/login');
            } else {
                console.log('Đăng nhập thành công');
                if (password === user.password) {
                    // res.render('home', { layout: 'main.hbs' });
                    req.session.loggedin = true;
                    res.redirect('/');
                }
                // bcrypt.compare(password, user.password, (err, result) => {
                //     if (result == true) {
                //         console.log('bcrypt = true');
                //         req.session.loggedin = true;
                //         req.session.user = user;
                //         res.redirect('/home');
                //     } else {
                //         // A user with that email address does not exists
                //         console.log('bcrypt = false');
                //         const conflictError = 'User credentials are not valid.';
                //         res.render('authen/login', { email, password, conflictError });
                //     }
                // })
            }
        })
    } else {
        // A user with that email address does not exists
        const conflictError = 'User credentials are not valid.';
        res.render('authen/login', { email, password, conflictError });
    }
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.redirect('/500');
        res.redirect('/');
    })
}