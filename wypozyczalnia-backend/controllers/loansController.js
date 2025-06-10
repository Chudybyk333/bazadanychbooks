const db = require('../db');

// GET /loans – wszystkie wypożyczenia
exports.getAllLoans = (req, res) => {
  const sql = `
    SELECT loans.*, users.name AS user_name, books.title AS book_title
    FROM loans
    JOIN users ON loans.users_id = users.id
    JOIN books ON loans.books_id = books.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST /loans – nowe wypożyczenie
exports.createLoan = (req, res) => {
  const { users_id, books_id, loan_date, return_date } = req.body;
  const sql = `INSERT INTO loans (users_id, books_id, loan_date, return_date) VALUES (?, ?, ?, ?)`;
  db.query(sql, [users_id, books_id, loan_date, return_date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Wypożyczenie dodane', loan_id: result.insertId });
  });
};
