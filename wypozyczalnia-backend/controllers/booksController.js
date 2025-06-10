const db = require('../db');

// GET /books
exports.getAllBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET /books/:id
exports.getBookById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Książka nie znaleziona' });
    res.json(results[0]);
  });
};
