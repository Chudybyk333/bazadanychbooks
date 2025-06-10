const db = require('../db');

// GET /books?title=&author=&minRating=
exports.getAllBooks = (req, res) => {
  const { title, author, minRating } = req.query;

  let sql = `
    SELECT 
      books.id,
      books.title,
      books.available,
      authors.name as author,
      IFNULL(AVG(reviews.rating), 0) as avgRating
    FROM books
    JOIN authors ON books.authors_id = authors.id
    LEFT JOIN reviews ON books.id = reviews.books_id
  `;

  // Warunki filtrowania
  const conditions = [];
  const params = [];

  if (title) {
    conditions.push('books.title LIKE ?');
    params.push(`%${title}%`);
  }

  if (author) {
    conditions.push('authors.name LIKE ?');
    params.push(`%${author}%`);
  }

  if (minRating) {
    conditions.push(`(SELECT AVG(rating) FROM reviews WHERE books_id = books.id) >= ?`);
    params.push(minRating);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' GROUP BY books.id';

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};


// POST /books
exports.addBook = async (req, res) => {
  const { title, authorName, categoryId } = req.body;

  if (!title || !authorName || !categoryId) {
    return res.status(400).json({ message: 'Brakuje wymaganych danych' });
  }

  try {
    // 1. Sprawdź, czy autor istnieje
    let [authorRows] = await db.promise().query('SELECT id FROM authors WHERE name = ?', [authorName]);

    let authorId;

    if (authorRows.length > 0) {
      authorId = authorRows[0].id;
    } else {
      // 2. Jeśli nie istnieje — dodaj nowego autora
      const [insertAuthorResult] = await db.promise().query(
        'INSERT INTO authors (name) VALUES (?)',
        [authorName]
      );
      authorId = insertAuthorResult.insertId;
    }

    // 3. Dodaj książkę
    await db.promise().query(
      'INSERT INTO books (title, authors_id, categories_id) VALUES (?, ?, ?)',
      [title, authorId, categoryId]
    );

    res.status(201).json({ message: 'Książka została dodana' });
  } catch (err) {
    console.error('Błąd przy dodawaniu książki:', err);
    res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
  }
};

