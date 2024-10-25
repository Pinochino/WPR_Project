const { connectDb } = require("../data/dbSetup");

class InboxController {

    // [GET] /inbox 
    index(req, res) {
        res.render('InboxPage');
    }

    // [GET] /inbox?page=
    async read(req, res) {
        const resultPerPage = parseInt(req.params.limit) || 5;

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
            sql = `SELECT ID, SUBJECT, MESSAGE, RECEIVED_AT FROM EMAILS LIMIT ${startingLimit}, ${resultPerPage}`;
            [rows] = await db.query(sql);
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

    // [GET] /inbox?totalPages=
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

    // [DELETE] /inbox/delete/:id
    async deleteById(req, res) {
        const { id } = req.body;
        console.log(id);
        // let db;
        // try {
        //     db = await connectDb();
        //     const sql = ``;
        //     const [rows] = await db.query(sql);
        //     if (rows.affectedRows) {
        //         return res.status(200).json({ message: `Delete email by ${id}` })
        //     }
        //     return res.status(400).json({ message: `Cannot delete the email` })
        // } catch (error) {
        //     return res.status(500).json({ message: `${error}` })
        // }
    }

    // [DELETE] /inbox/deleteAll
    async deleteAll(req, res) {
        let db;
        try {
            db = await connectDb();
            const sql = ``;
            const [rows] = await db.query(sql);
            if (rows.affectedRows) {
                return res.status(200).json({ message: `Delete email by ${id}` })
            }
            return res.status(400).json({ message: `Cannot delete the email` })
        } catch (error) {
            return res.status(500).json({ message: `${error}` })
        }
    }

    async handleFormAction(req, res) {
        const { emailIds } = req.body.emailIds
        if (!emailIds || emailIds.length === 0) {
            return res.status(400).json({ message: 'No emails selected for deletion' });
        }
        let db;
        try {
            let sql = `DELETE FROM emails WHERE id IN (?) AND userId = ?`;
            db = await connectDb();
            const [rows] = await db.query(sql, [emailIds, req.user.id]);
            if (rows.affectedRows) {
                return res.status(200).json({ message: `Deleted successfully ${_ids}` })
            }
            return res.status(400).json({ message: `Fail to delete` });
        } catch (error) {
            return res.status(500).json({ error: `${error}` })
        }

        switch (key) {
            case 'delete':

                break;

            default:
                return res.json({ message: `Action is invalid` })
                break;
        }
    }
}

module.exports = InboxController;