const { connectDb } = require("../data/dbSetup");

class ComposeController {
    index(req, res) {
        res.render('ComposePage');
    }

    async create(req, res) {
        let db;
        const sender_id = req.cookies.userId;
        const { recipient, subject, message, file } = req.body;
        const errors = {}
        if (!recipient) {
            errors.recipient = `Làm ơn hãy nhập người nhận`;
        }
        if (!subject) {
            errors.subject = `Làm ơn hãy nhập tiêu đề`;
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        try {
            db = await connectDb();
            const sql1 = `SELECT ID FROM USER WHERE USERNAME= ?`;
            const [rows] = await db.query(sql1, recipient);
            if (!rows) {
                return res.status(400).json({ message: `Cannot find username ${recipient}}` })
            }

            const values = [
                sender_id,
                rows[0].ID,
                subject,
                message,
                file
            ]

            const sql2 = `INSERT INTO EMAILS (SENDER_ID, RECIPIENT_ID, SUBJECT, MESSAGE, FILE)  VALUES (?, ?, ?, ?, ?)`;
            const [data] = await db.query(sql2, values);
            if (data.affectedRows > 0) {
                return res.status(200).json({
                    message: "Email sent successfully",
                });
            }
        } catch (error) {
            return res.status(500).json({ message: `${error}` })
        }
    }

    async getRecipient(req, res) {
        const current_username = req.cookies.username;
        let db;
        try {
            db = await connectDb();
            const sql = `SELECT USERNAME FROM USER WHERE USERNAME != ?`;
            const [rows] = await db.query(sql, [current_username]);
            if (rows) {
                return res.status(200).json([rows]);
            }
            return res.status(400).json({ message: `Cannot get the datd` });
        } catch (error) {
            return res.status(500).json({ error: `${error}` })
        }
    }

}

module.exports = ComposeController;