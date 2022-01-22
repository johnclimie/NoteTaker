const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const notes = require('./db/db.json')

const PORT = 3001;

const app = express();
const readFromFile = util.promisify(fs.readFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
    
})

app.post('/api/notes', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})