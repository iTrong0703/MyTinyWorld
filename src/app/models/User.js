const sql = require("../config/connectDb");

const User = function (user) {
    this.email = user.email;
    this.password = user.password;

};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findByEmail = (email, result) => {
    sql.query(`SELECT * from user WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log("Không tìm thấy email");
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Đã tìm thấy email");
            result(null, res[0])
            return;
        }
        result(null, null);
    });
}

User.verify = (email, result) => {
    console.log('verfy: ' + email);
    sql.query(
        "UPDATE user SET email_verified_at = ? WHERE email = ?",
        [new Date(), email],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { email: email });
        }
    );
}

User.checkVerify = (email, result) => {
    sql.query(
        "SELECT email_verified_at FROM user WHERE email = ?",
        [email],
        (err, res) => {
            if (err) {
                console.log("Error checking verification:", err);
                result(err, null);
                return;
            }

            if (res.length) {
                // Nếu có một dòng được trả về, có nghĩa là email đã được xác minh
                result(null, { verified: true, email_verified_at: res[0].email_verified_at });
            } else {
                // Nếu không có dòng nào được trả về, có nghĩa là email chưa được xác minh
                result(null, { verified: false });
            }
        }
    );
};


User.resetPassword = (email, password, result) => {
    sql.query(
        "UPDATE user SET password = ? WHERE email = ?",
        [password, email],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { email: email });
        }
    );
};

module.exports = User;