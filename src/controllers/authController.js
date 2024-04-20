const User = require("../models/User");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv/config');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60; // hết hạn sao 3 ngày
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: maxAge
    });
};

// Tạo transporter cho nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

// controller actions
module.exports.signup_get = (req, res) => {
    res.render('authen/signup', { layout: 'authen.hbs' });
}

module.exports.signin_get = (req, res) => {
    res.render('authen/signin', { layout: 'authen.hbs' });
}

module.exports.verify_get = async (req, res) => {
    const { email, token } = req.query;

    // Kiểm tra email và token trong URL
    if (!email || !token) {
        // Nếu thiếu email hoặc token, chuyển hướng đến trang lỗi hoặc thông báo lỗi
        return res.redirect('/error');
    }
    try {
        // Giải mã token và kiểm tra
        jwt.verify(token, process.env.TOKEN_KEY);

        // Cập nhật trạng thái xác thực của người dùng trong cơ sở dữ liệu
        await User.findOneAndUpdate({ email: email }, { isVerified: true });

        // Hiển thị trang xác thực thành công
        res.render('authen/verifySuccess', { layout: 'authen.hbs', message: "Xác thực email thành công!!!" });
    } catch (err) {
        console.error(err);
        // Nếu có lỗi trong quá trình xác thực, chuyển hướng đến trang lỗi hoặc thông báo lỗi
        res.redirect('/error');
    }
}



module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);

        // Gửi email xác thực
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: 'Email Verification',
            html: `
                <h1>Welcome to Our Website</h1>
                <p>Please click <a href="${process.env.APP_URL}/verify?email=${email}&token=${token}">here</a> to verify your email address.</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                return res.render('authen/verifyEmail', {
                    layout: 'authen.hbs', title: "Đăng ký thành công!!!", description: "Vui lòng xác thực email bằng cách nhấn vào đường link được gửi trong email của bạn!!!"
                });
            }
        });

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.signin_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signin(email, password);

        if (!user.isVerified) {
            // Nếu người dùng chưa xác thực email, redirect đến trang thông báo xác thực email
            return res.render('authen/verifyEmail', {
                layout: 'authen.hbs', title: "Email chưa xác thực!!!", description: "Vui lòng xác thực email bằng cách nhấn vào đường link được gửi trong email của bạn!!!"
            });
        }

        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect('/');
        // res.status(200).json({ user: user._id });

    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.password_reset_get = (req, res) => {
    const { email, token } = req.query;
    if (!email || !token) {
        res.render("authen/forgotPassword/submitEmail", { layout: "authen.hbs" });
    } else {
        res.render("authen/forgotPassword/changePassword", {
            layout: "authen.hbs",
            email: email,
            token: token,
        });
    }
}

module.exports.password_reset_post = async (req, res) => {
    const source = req.query.source;

    if (source === 'changePassword') {
        const { email, token, password } = req.body;
        try {
            const user = await User.findByEmail(email);
            if (!user) {
                res.redirect("/error");
            } else {
                const isValidToken = await bcrypt.compareSync(email, token); //nếu dùng compare thì phải dùng .then()
                console.log(isValidToken);
                if (isValidToken) {
                    user.password = password; // Cập nhật password mới vào đối tượng user
                    await user.save(); // Lưu thay đổi vào cơ sở dữ liệu, password sẽ được hash tự động trước khi lưu
                    res.render('authen/verifySuccess', { layout: 'authen.hbs', message: "Đổi mật khẩu thành công!!!" });
                } else {
                    res.redirect("/error");
                }
            }
        } catch (err) {
            console.error(err);
            res.redirect("/error");
        }
    } else if (source === 'submitEmail') {
        const { email } = req.body;

        try {
            const user = await User.findByEmail(email);
            if (!user) {
                res.redirect("/password_reset");
            } else {
                const token = await bcrypt.hash(user.email, parseInt(process.env.BCRYPT_SALT_ROUND));

                // Gửi email đặt lại mật khẩu
                const mailOptions = {
                    from: process.env.MAIL_USERNAME,
                    to: email,
                    subject: "Reset Password",
                    html: `
                    <h1>Reset Password</h1>
                    <p>Please click <a href="${process.env.APP_URL}/password_reset?email=${email}&token=${token}">here</a> to reset your password.</p>
                `,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        res.redirect("/error");
                    } else {
                        console.log("Email sent: " + info.response);
                        res.render('authen/verifyEmail', {
                            layout: 'authen.hbs', title: "Yêu cầu đổi mật khẩu thành công!!!", description: "Vui lòng nhấn vào đường link được gửi trong email của bạn để tiến hành thay đổi mật khẩu!!!"
                        });
                    }
                });
            }
        } catch (err) {
            console.error(err);
            res.redirect("/error");
        }
    } else {
        res.redirect("/error");
    }


}

module.exports.change_password_get = (req, res) => {
    res.render("change_password", { layout: "main.hbs" });
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}