// Không cho vào trang home nếu chưa login
exports.loggedin = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user;
        next();
    } else {
        res.redirect('/login');
    }
}

// Không cho vào trang login nếu đã đăng nhập
exports.isAuth = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user;
        res.redirect('/');
    } else {
        next();
    }
}
