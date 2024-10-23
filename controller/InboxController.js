const { connectDb } = require("../data/dbSetup");

class InboxController {
    index(req, res) {
        res.render('InboxPage');
    }

    async read(req, res) {
        let db;
        try {
            db = await connectDb();
            const sql = `SELECT SUBJECT, MESSAGE, TIMESTAMP FROM EMAILS`;
            const [rows] = await db.query(sql);
            if (rows) {
                return res.status(200).render('InboxPage', {emails: rows});
            }
            return res.status(400).json({ message: `Cannot get data form emails table` })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `${error}` })
        }
    }

    async paginatedPage(req, res) {
        const PAGE_SIDE = 5;

        const page = parseInt(req.query.page) || 1;

        const offset = (page - 1) * PAGE_SIDE;
        const sql = `SELECT * FROM emails ORDER BY created_at DESC LIMIT = ? AND OFFSET = ?`;
        let db;
        try {
            db = await connectDb();
            const [rows] = await db.query(sql, [PAGE_SIDE, offset]);
            if (rows) {
                return res.status(200).render('InboxPage');
            }
            return res.status(400).json({ message: `Cannot get the data` });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `${error}` })
        }
    }

    async countPage(req, res) {
        let db;
        const PAGE_SIDE = 5;
        try {
            const sql = `SELECT COUNT(*) AS totalEmails FROM emails`;
            db = await connectDb();
            const [rows] = await db.query(sql);

            const totalEmails = rows[0].totalEmails;
            const totalPages = Math.ceil(totalEmails / PAGE_SIDE)
            res.json({
                totalEmails,
                totalPages
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `${error}` })
        }
    }
}

module.exports = InboxController;