const db = require('../db');

// GET /authors – wszyscy autorzy
exports.getAllAuthors = (req, res) => {
  db.query('SELECT * FROM authors', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET /authors/:id – jeden autor
exports.getAuthorById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM authors WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Autor nie znaleziony' });
    res.json(results[0]);
  });
};

// POST /authors – nowy autor
exports.createAuthor = (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO authors (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Autor dodany', author_id: result.insertId });
  });
};
