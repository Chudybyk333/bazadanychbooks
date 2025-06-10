const db = require('../db');

// GET /reviews – wszystkie recenzje z nazwami użytkownika i książki
exports.getAllReviews = (req, res) => {
  const sql = `
    SELECT reviews.*, users.name AS user_name, books.title AS book_title
    FROM reviews
    JOIN users ON reviews.users_id = users.id
    JOIN books ON reviews.books_id = books.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST /reviews – dodanie recenzji
exports.createReview = (req, res) => {
  const { users_id, books_id, rating, comment } = req.body;
  const sql = `INSERT INTO reviews (users_id, books_id, rating, comment) VALUES (?, ?, ?, ?)`;
  db.query(sql, [users_id, books_id, rating, comment], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Recenzja dodana', review_id: result.insertId });
  });
};
