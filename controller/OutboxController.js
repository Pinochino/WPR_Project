const { connectDb } = require("../data/dbSetup");

class OutboxController {
    index(req, res) {
        res.render('OutboxPage');
    }

    async read(req, res) {
        const resultPerPage = parseInt(req.params.limit) || 5;
        const userId = req.cookies.userId;

        if (!userId || !resultPerPage) {
            return res.status(200).redirect('/');
        }

        let db;
        try {
            db = await connectDb();
            let sql = `SELECT ID, SUBJECT, MESSAGE, RECEIVED_AT FROM EMAILS`;
            let [rows] = await db.query(sql);
            const numOfResult = rows.length;
            const numberOfPages = Math.ceil(numOfResult / resultPerPage);

            let page = req.query.page ? Number(req.query.page) : 1;
            if (page > numberOfPages) {
                res.redirect('/?page=' + encodeURIComponent(numberOfPages));
            } else if (page < 1) {
                res.redirect('/?page=' + encodeURIComponent(1));
            }

            // Determine the SQL LIMIT starting number;
            const startingLimit = (page - 1) * resultPerPage;

            // Get the relevant number of POSTS for this starting page
            sql = `SELECT ID, SUBJECT, MESSAGE, RECEIVED_AT FROM EMAILS WHERE SENDER_ID = ? AND IS_DELETED_BY_RECIPIENT = FALSE LIMIT ${startingLimit}, ${resultPerPage}`;

            [rows] = await db.query(sql, userId);
            let iterator = (page - 5) < 1 ? 1 : page - 5;
            let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
            if (endingLink < ((page + 4))) {
                iterator -= (page + 4) - numberOfPages;
            }

            if (rows) {
                return res.status(200).render('InboxPage', { data: rows, page, iterator, endingLink, numberOfPages })
            }
            return res.status(400).json({ message: `Cannot fetch the data` })
        } catch (error) {
            return res.status(500).json({ message: `${error}` })
        }
    }
}

module.exports = OutboxController;