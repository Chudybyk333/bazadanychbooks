const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Prosty endpoint do testu połączenia
app.get('/', (req, res) => {
  res.send('API działa');
});

// Przykładowy endpoint: lista książek
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
