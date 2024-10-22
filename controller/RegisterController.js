const { encryptText } = require("../config/crypto");
const { connectDb } = require("../data/dbSetup");
const crypto = require('crypto');

class RegisterController {
    index(req, res) {
        res.render('SignUp')
    }

    async create(req, res) {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: `Username, email, password are required` })
        }
        const USERNAME_REGEX = /^[a-zA-Z]{3,}$/;
        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const PASSWORD_REGEX = /^.{6,}$/;

        if (!USERNAME_REGEX.test(username)) {
            return res.status(400).json({ message: "Username is not valid" });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ message: "Email is not valid" });
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const keyCrypto = "myPassword123";
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