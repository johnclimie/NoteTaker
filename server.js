// Required packages
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

// Sets up a port
const PORT = process.env.PORT ||3001;

// App allows express NPM to be operated with
const app = express();

// Middleware parses JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET routes allows page to return a file if that route is met
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
})

// POST allows new notes to be saved into the db.json file
app.post('/api/notes', (req, res) => {
    // Creates new references  
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const newNotes = req.body;
    newNotes.id = uuid.v4();

    // New notes are pushed and written into JSON file
    notes.push(newNotes);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes);
})

// GET for asterisk allows the index.html file to load by default
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// PORT is set up in order to have the server go live.
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})