const { error } = require("console");
const { encryptText } = require("../config/crypto");
const { connectDb } = require("../data/dbSetup");
const crypto = require('crypto');
const keyCrypto = "myPassword123456";


class RegisterController {
    index(req, res) {
        const { username, email, password, password_confirmation } = req.body;
        res.render('SignUp', { error, username, email, password, password_confirmation })
    }

    async create(req, res) {
        const { username, email, password, password_confirmation } = req.body;
        // let error = {};

        if (!username || !email || !password) {
            error.username = 'Username are required';
            error.email = 'email are required';
            error.password = 'password are required';
            return res.render('SignUp', { error }) // Trả về lỗi dưới dạng JSON
        }
        // const USERNAME_REGEX = /^[\p{L}\s]{3,}$/u;
        // const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const PASSWORD_REGEX = /^.{6,}$/;

        // if (!USERNAME_REGEX.test(username)) {
        //     error.username = 'Username is not valid';
        // }

        // if (!EMAIL_REGEX.test(email)) {
        //     error.email = 'Email is not valid';
        // }

        // if (!PASSWORD_REGEX.test(password)) {
        //     error.password = 'Password must be at least 6 characters';
        // }

        // if (!PASSWORD_REGEX.test(password_confirmation)) {
        //     error.password_confirmation = 'Password must be at least 6 characters';
        // } else if (password_confirmation !== password) {
        //     error.password_confirmation = 'Re password is not equal with password';
        // }

        // if (Object.keys(error).length > 0) {
        //     return res.status(400).json({ error }); // Trả về lỗi dưới dạng JSON
        // }

        const encryptedPassword = encryptText(password, keyCrypto);
        const user = [username, email, encryptedPassword];

        let db;
        try {
            db = await connectDb();
            const sql = `INSERT INTO user (USERNAME, EMAIL, PASSWORD) VALUES (?, ?, ?)`;
            const [rows] = await db.query(sql, user);
            if (rows.affectedRows) {
                return res.status(200).redirect('/'); // Redirect nếu thành công
            }
            return res.status(400).json({ message: 'Fail to create user' });
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }

}

module.exports = RegisterController;