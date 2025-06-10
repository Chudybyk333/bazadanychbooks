const db = require('../db');

// GET /users – pobierz wszystkich użytkowników
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET /users/:id – jeden użytkownik
exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
    res.json(results[0]);
  });
};

// POST /users – nowy użytkownik
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Użytkownik dodany', user_id: result.insertId });
  });
};
