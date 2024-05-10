const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    managername: {
        type: String,
        required: [true, 'Please enter an name'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    isVerified: {
        type: Boolean,
        default: false // Mặc định là chưa được xác thực
    }
});


// mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.signin = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email });
};

userSchema.statics.resetPassword = async function (email, hashedPassword) {
    try {
        const user = await this.findOneAndUpdate({ email: email }, { password: hashedPassword });
        return user;
    } catch (error) {
        throw error;
    }
};


const User = mongoose.model('user', userSchema);

module.exports = User;