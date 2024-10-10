const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// Set view engine EJS
app.set('view engine', 'ejs');

// Adding css to file ejs
app.use(express.static(path.join(__dirname, 'public')));

// multer module 
const multer = require('multer');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

//connect Database



// routers 
app.get('/', (req, res) => res.render('pages/HomePage'));
app.get('/sign-up', (req, res) => res.render('pages/SignUp'));
app.get('/inbox-page', (req, res) => res.render('pages/InboxPage.ejs'));
app.get('/detail-page', (req, res) => res.render('pages/DetailPage.ejs'));
app.get('/outbox-page', (req, res) => res.render('pages/OutboxPage.ejs'));
app.get('/compose-page', (req, res) => res.render('pages/ComposePage.ejs'));

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
