const db = require('../db');

// GET /categories
exports.getAllCategories = (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Błąd podczas pobierania kategorii:', err);
      return res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
    }
    res.status(200).json(results);
  });
};
