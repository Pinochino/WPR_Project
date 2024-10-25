const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const route = require('./routes')
const path = require('path')
const app = express();
const multer = require('multer');
const { connectDb, setupDatabase } = require('./data/dbSetup');
const cookieParser = require('cookie-parser');




// Set view engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));


// Adding css to file ejs
app.use(express.static(path.join(__dirname, 'public')));

// multer module 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());


// cookie-parser
app.use(cookieParser());

//connect Database
connectDb();
// setupDatabase();



// routers 
route(app);

app.listen(process.env.PORT, () => console.log(`Example app listening on port http://localhost:${process.env.PORT}`))
