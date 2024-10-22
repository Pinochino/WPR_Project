const { decryptText } = require('../config/crypto');
const { connectDb } = require('../data/dbSetup');
const keyCrypto = "myPassword123456";



class HomeController {
    index(req, res) {
        res.render('HomePage');
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            let db;
            db = await connectDb();
            const sql = 'SELECT USERNAME, PASSWORD FROM user WHERE USERNAME=?';
            const [rows] = await db.query(sql, [username])
            if (rows[0].USERNAME === username && decryptText(rows[0].PASSWORD, keyCrypto) === password) {
                return res.status(200).redirect('/inbox');
            }
            return res.status(400).json({ message: `Fail to login` })
        } catch (error) {
            return res.status(500).json({ message: `${error}` })
        }
    }
}

module.exports = HomeController;