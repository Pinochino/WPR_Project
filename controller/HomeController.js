const dbConnect = require('../data/dbSetup')

class HomeController {
    index(req, res) {
        res.render('HomePage');
    }

    async login(req, res) {
        const { email, password } = req.body;
        const user = [
            email,
            password
        ]
        let db;
        try {
            db = await dbConnect();
            const sql = 'SELECT EMAIL, PASSWORD FROM users';
            const [rows] = await db.query(sql, user)
            if (rows[0].email === email && rows[0].password === password) {
                return res.status(200).redirect('/');
            }
            return res.status(400).json({ message: `Fail to login` })
        } catch (error) {
            return res.status(500).json({ message: `${error}` })
        }
    }
}

module.exports = HomeController;