const {connectDb} = require("../data/dbSetup");

class EmailController {
    index(req, res) {
        const pageNumber = req.params.id;
        return res.render('EmailDetailPage', {page: {pageNumber}});
    }

    async read(req, res) {
        const pageNumber = req.params.id;
        let db;
        try {
            db = await connectDb();
            const sql = `SELECT SUBJECT, MESSAGE, FILE FROM EMAILS WHERE ID = ?`;
            const [rows] = await db.query(sql, pageNumber);
            if (rows.length > 0) {
                return res.status(200).render('EmailDetailPage', {email: rows[0]});
            }
            return res.status(400).json({message: `Cannot find detail email ${pageNumber}}`})
        } catch (error) {
            return res.status(500).json({error: `${error}`});
        }
    }

     async downloadFile(req, res) {
        const pageNumber = req.params.id;
        let db;
        try{
            db = await connectDb();
            const sql = `SELECT FILE FROM EMAILS WHERE ID = ?`;
            const [rows] = await db.query(sql, pageNumber);
            const  filePath = rows[0].FILE;
            if (rows.length > 0 && filePath) {
                return res.downloadFile(filePath);
            }
            return res.status(400).json({message: `Cannot find file ${filePath}`})
        }catch(err){
            return res.status(500).json({error: `${err}`});
        }
     }
}

module.exports = EmailController;