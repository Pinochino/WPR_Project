const express = require('express');
const app = express();
const port = 8000;

// Set view engine EJS
app.set('view engine', 'ejs');


// multer module 
const multer = require('multer');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

//connect Database


app.get('/', (req, res) => res.render('views/HomePage'));
app.get('/sign-up', (req, res) => res.render('views/SignUp'));
app.get('/inbox-page', (req, res) => res.render('views/InboxPage.ejs'));
app.get('/detail-page', (req, res) => res.render('views/DetailPage.ejs'));
app.get('/outbox-page', (req, res) => res.render('views/OutboxPage.ejs'));
app.get('/compose-page', (req, res) => res.render('views/ComposePage.ejs'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
