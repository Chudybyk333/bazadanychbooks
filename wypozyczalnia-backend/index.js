const express = require('express');
const cors = require('cors');
const db = require('./db');
const booksRoutes = require('./routes/booksRoutes');
const loansRoutes = require('./routes/loansRoutes');
const usersRoutes = require('./routes/usersRoutes');
const authorsRoutes = require('./routes/authorsRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const categoriesRoutes = require('./routes/categories');


const app = express();
app.use(cors());
app.use(express.json());

// Trasy
app.use('/books', booksRoutes);
app.use('/loans', loansRoutes);
app.use('/users', usersRoutes);
app.use('/authors', authorsRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/categories', categoriesRoutes);

// Test endpoint
app.get('/', (req, res) => res.send('API działa'));

const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
