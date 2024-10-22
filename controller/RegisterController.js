const { encryptText } = require("../config/crypto");
const { connectDb } = require("../data/dbSetup");
const crypto = require('crypto');
const keyCrypto = "myPassword123456";


class RegisterController {
    index(req, res) {
        res.render('SignUp')
    }

    async create(req, res) {
        const { username, email, password } = req.body;
        let errors = [];

        if (!username || !email || !password) {
            return res.status(400).json({ message: `Username, email, password are required` })
        }
        const USERNAME_REGEX = /^[\p{L}\s]{3,}$/u
        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const PASSWORD_REGEX = /^.{6,}$/;

        if (!USERNAME_REGEX.test(username)) {
            errors.push("Username is not valid");
        }

        if (!EMAIL_REGEX.test(email)) {
            errors.push("Email is not valid");
        }

        if (!PASSWORD_REGEX.test(password)) {
            errors.push("Password must be at least 6 characters");
        }

        if (errors.length > 0) {
            return res.render('SignUp', { errors })
        }
        const encryptedPassword = encryptText(password, keyCrypto);

        const user = [
            username,
            email,
            encryptedPassword
        ]

        let db;
        try {
            db = await connectDb();
            const sql = `INSERT INTO user (USERNAME, EMAIL, PASSWORD)  VALUES (?, ?, ?)`;
            const [rows] = await db.query(sql, user);
            if (rows.affectedRows) {
                return res.status(200).redirect('/');
            }
            return res.status(400).json({ message: `Fail to create user` });
        } catch (error) {
            return res.status(500).json({ message: `${error}` })
        }
    }
}

module.exports = RegisterController;