const mysql2 = require('mysql2/promise');

async function connectDb() {
    try {
        const db = await mysql2.createConnection({
            host: 'localhost',
            user: 'wpr',
            password: 'fit2024',
            database: 'wpr2201040080'
        });
        return db;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

async function setupDatabase() {
    try {
        let db;
        db = await connectDb();
        const sql1 = `CREATE TABLE IF NOT EXISTS user  (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
        await db.query(sql1);
        console.log("User table created successfully");

        const sql2 = `CREATE TABLE IF NOT EXISTS emails (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_id INT,
        recipient_id INT,
        subject VARCHAR(255),
        message TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES user(id),
        FOREIGN KEY (recipient_id) REFERENCES user(id)
      );`
        await db.query(sql2);
        console.log("Email table created successfully");

        await db.end();
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

module.exports = { connectDb, setupDatabase }


