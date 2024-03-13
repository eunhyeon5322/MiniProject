const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ReviewData'
});

db.connect((err) => {
    if (err) {
        console.error('Unable to connect to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.post('/addReview', (req, res) => {
    const review = req.body;

    db.query('INSERT INTO Reviews (Content, Rating) VALUES (?, ?)', [review.content, review.rating], (err, result) => {
        if (err) {
            console.error('Error inserting review into MySQL:', err);
            res.status(500).send('Error inserting review into MySQL');
        } else {
            console.log('Review inserted into MySQL');
            res.sendStatus(200);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
