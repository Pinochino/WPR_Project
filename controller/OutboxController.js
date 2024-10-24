const { connectDb } = require("../data/dbSetup");

class OutboxController {
    index(req, res) {
        res.render('OutboxPage');
    }

    async create(req, res) {

        const { title, message } = req.body;
        const values = [
            title,
            message
        ]
        let db;
        try {
            db = await connectDb();
            const sql = `INSERT INTO EMAILS VALUES (?, ?, ?, ?)`;
            const [rows] = await db.query(sql, values);
            if (rows.affectedRows) {
                return res.status(200).json({ message: `Insert data successfully`, values })
            }
            return res.status(400).json({ message: `Cannot insert message` })
        } catch (error) {
            return res.status(500).json({ message: `${error}` })
        }

    }
}

module.exports = OutboxController;