const {connectDb} = require("../data/dbSetup");
const path = require("path");

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
            const sql = `SELECT ID, SUBJECT, MESSAGE, FILE FROM EMAILS WHERE ID = ?`;
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
        console.log(`Downloading ${pageNumber}`);
        let db;
        try{
            db = await connectDb();
            const sql = `SELECT FILE, SUBJECT FROM EMAILS WHERE ID = ?`;
            const [rows] = await db.query(sql, pageNumber);


            if (rows.length > 0 && rows[0].FILE) {
                const  fileData = rows[0].FILE;
                // Thiết lập headers
                const fileName = rows[0].SUBJECT || 'downloadedFile'; // Đặt tên file mặc định nếu không có SUBJECT

                // Thiết lập headers
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'); // Đúng cho file .docx
                res.setHeader('Content-Disposition', `attachment; filename="${fileName}.docx"`); // Đặt tên file
                res.setHeader('Content-Length', fileData.length); // Đặt độ dài nội dung

                return res.send(fileData); // Gửi file nhị phân
            }
            return res.status(400).json({message: `Cannot find file for email ${pageNumber}}`})
        }catch(err){
            return res.status(500).json({error: `${err}`});
        }
     }
}

module.exports = EmailController;