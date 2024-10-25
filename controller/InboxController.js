const { connectDb } = require("../data/dbSetup");

class InboxController {

    // [GET] /inbox 
    index(req, res) {
        res.render('InboxPage');
    }

    // [GET] /inbox?page=
    async read(req, res) {
        const resultPerPage = parseInt(req.params.limit) || 5;
        const userId = req.cookies.userId;

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
            sql = `SELECT ID, SUBJECT, MESSAGE, RECEIVED_AT FROM EMAILS WHERE RECIPIENT_ID = ? AND IS_DELETED_BY_RECIPIENT = FALSE LIMIT ${startingLimit}, ${resultPerPage}`;

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


    async handleFormAction(req, res) {
        const { emailIds } = req.body;
        console.log(emailIds);
        const userId = req.cookies.userId;
        console.log('user id: ', userId);

        if (!emailIds || emailIds.length === 0) {
            return res.status(400).json({ message: 'No emails selected for deletion' });
        }

        const placeholders = emailIds.map(() => '?').join(', ');
        console.log('ids: ', placeholders);
        let db;
        try {
            let sql = `UPDATE emails 
                 SET is_deleted_by_recipient = TRUE 
                 WHERE recipient_id = ? AND id IN (${placeholders})`;
            db = await connectDb();
            const [rows] = await db.query(sql, [userId, ...emailIds]);
            console.log('rows: ', [rows]);
            console.log('affect rows: ', rows.affectedRows);
            if (rows.affectedRows) {
                return res.status(200).json({ message: `Deleted successfully ${_ids}` })
            }
            return res.status(400).json({ message: `Fail to delete` });
        } catch (error) {
            return res.status(500).json({ error: `${error}` })
        }
    }

    async getInboxEmails(req, res) {
        const userId = req.user.id;

        let db;
        try {
            db = await connectDb();

            // Truy vấn chỉ lấy các email chưa bị xóa bởi người nhận
            const sql = `SELECT * FROM emails 
                       WHERE recipient_id = ? AND is_deleted_by_recipient = FALSE`;

            const [rows] = await db.query(sql, [userId]);

            return res.status(200).json(rows);
        } catch (error) {
            return res.status(500).json({ error: `An error occurred: ${error.message}` });
        }
    }

    async logout(req, res) {
        try {
            await res.clearCookie('userId');
            await res.clearCookie('username');
            return res.status(200).json({ message: `Logout successfully` });
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }

    }
}



module.exports = InboxController;