const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const db = require('./db/db.json')

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

const readFromFile = util.promisify(fs.readFile);

// app.get('/api/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, db))
// })


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})