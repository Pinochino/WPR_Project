const mysql2 = require("mysql2/promise");

async function connectDb() {
    try {
        const db = await mysql2.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "wpr2201040080"
        });
        return db;
    } catch (error) {
        console.error("Error connecting to the database:", error);
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
        file TEXT,
        send_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        FOREIGN KEY (sender_id) REFERENCES user(id),
        FOREIGN KEY (recipient_id) REFERENCES user(id)
      );`
        await db.query(sql2);
        console.log("Email table created successfully");

        await db.query(`
            INSERT INTO user (username, email, password) VALUES
            ("Alice Anderson", "a@a.com", "123"),
            ("Bob Brown", "bob@example.com", "password"),
            ("Charlie Clark", "charlie@example.com", "password")
          `);

        // Insert initial email data (at least 8 emails between the users)
        await db.query(`
            INSERT INTO emails (sender_id, recipient_id, subject, message, file, send_at, received_at) VALUES
            (1, 2, "Email 1", "Message for email 1", NULL, NOW(), NOW()),
            (1, 3, "Email 2", "Message for email 2", NULL, NOW(), NOW()),
            (2, 1, "Email 3", "Message for email 3", NULL, NOW(), NOW()),
            (2, 3, "Email 4", "Message for email 4", NULL, NOW(), NOW()),
            (3, 1, "Email 5", "Message for email 5", NULL, NOW(), NOW()),
            (3, 2, "Email 6", "Message for email 6", NULL, NOW(), NOW()),
            (1, 2, "Email 7", "Message for email 7", NULL, NOW(), NOW()),
            (1, 3, "Email 8", "Message for email 8", NULL, NOW(), NOW()),
            (2, 1, "Email 9", "Message for email 9", NULL, NOW(), NOW()),
            (2, 3, "Email 10", "Message for email 10", NULL, NOW(), NOW()),
            (3, 1, "Email 11", "Message for email 11", NULL, NOW(), NOW()),
            (3, 2, "Email 12", "Message for email 12", NULL, NOW(), NOW()),
            (1, 2, "Email 13", "Message for email 13", NULL, NOW(), NOW()),
            (1, 3, "Email 14", "Message for email 14", NULL, NOW(), NOW()),
            (2, 1, "Email 15", "Message for email 15", NULL, NOW(), NOW()),
            (2, 3, "Email 16", "Message for email 16", NULL, NOW(), NOW()),
            (3, 1, "Email 17", "Message for email 17", NULL, NOW(), NOW()),
            (3, 2, "Email 18", "Message for email 18", NULL, NOW(), NOW()),
            (1, 2, "Email 19", "Message for email 19", NULL, NOW(), NOW()),
            (1, 3, "Email 20", "Message for email 20", NULL, NOW(), NOW()),
            (2, 1, "Email 21", "Message for email 21", NULL, NOW(), NOW()),
            (2, 3, "Email 22", "Message for email 22", NULL, NOW(), NOW()),
            (3, 1, "Email 23", "Message for email 23", NULL, NOW(), NOW()),
            (3, 2, "Email 24", "Message for email 24", NULL, NOW(), NOW()),
            (1, 2, "Email 25", "Message for email 25", NULL, NOW(), NOW()),
            (1, 3, "Email 26", "Message for email 26", NULL, NOW(), NOW()),
            (2, 1, "Email 27", "Message for email 27", NULL, NOW(), NOW()),
            (2, 3, "Email 28", "Message for email 28", NULL, NOW(), NOW()),
            (3, 1, "Email 29", "Message for email 29", NULL, NOW(), NOW()),
            (3, 2, "Email 30", "Message for email 30", NULL, NOW(), NOW())
        `);
        await db.end();
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

module.exports = { connectDb, setupDatabase }


