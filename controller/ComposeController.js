const { connectDb } = require("../data/dbSetup");

class ComposeController {
    index(req, res) {
        res.render('ComposePage');
    }

    async create(req, res) {
        let db;
        const { receiver, message, subject, file } = req.body;
        const errors = {}
        if (!receiver) {
            errors.receiver = `Làm ơn hãy nhập người gửi`;
        }
        if (!subject) {
            errors.receiver = `Làm ơn hãy nhập tiêu đề`;
        }

        const values = [
            receiver,
            subject,
            message,
            file
        ]
        try {
            db = await connectDb();
            const sql = `INSERT INTO EMAILS RECEIVER, SUBJECT, MESSAGE, FILE  VALUES (?, ?, ?, ?)`;
            const [rows] = await db.query(sql, values);
            if (rows.affectedRows > 0) {
                return res.status(200).json(rows);
            }
        } catch (error) {
            return res.status(500).json({ message: `${error}` })
        }
    }

}

module.exports = ComposeController;