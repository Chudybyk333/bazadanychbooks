const db = require('../db');

// POST /authors
exports.addAuthor = (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Imię autora jest wymagane' });
  }

  // Sprawdź, czy autor już istnieje
  const checkQuery = 'SELECT * FROM authors WHERE name = ?';
  db.query(checkQuery, [name], (err, results) => {
    if (err) return res.status(500).json({ error: 'Błąd serwera' });

    if (results.length > 0) {
      return res.status(409).json({ error: 'Autor już istnieje' });
    }

    // Jeśli nie istnieje, dodaj autora
    const insertQuery = 'INSERT INTO authors (name) VALUES (?)';
    db.query(insertQuery, [name], (insertErr, insertResults) => {
      if (insertErr) return res.status(500).json({ error: 'Nie udało się dodać autora' });

      res.status(201).json({ message: 'Autor dodany pomyślnie', id: insertResults.insertId });
    });
  });
};
