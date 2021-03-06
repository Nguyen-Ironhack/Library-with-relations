const router = require("express").Router();
const Book = require('../models/Book');
const Author = require('../models/Author');

router.get('/books', (req, res) => {
  // get all the books from the database -> find() returns all the documents
  Book.find().then(booksFromDB => {
    // console.log(booksFromDB);
    // render a books view to display them
    res.render('books', { booksList: booksFromDB });
  }).catch(err => {
    console.log(err);
  });
});

router.get('/books/add', (req, res) => {
  Author.find()
    .then(authors => res.render('bookForm', {authors}))
    .catch(err => console.log(err));
});

router.get('/books/delete/:id', (req, res) => {
  const bookId = req.params.id;
  Book.findByIdAndDelete(bookId)
    .then(() => {
      // redirect to the books list
      res.redirect('/books')
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/books/edit/:id', (req, res) => {
  const bookId = req.params.id;
  Book.findById(bookId)
    .then(book => res.render('bookEdit', {book: book}))
    .catch(err => console.log(err));
});


router.post('/books', (req, res) => {
  const { title, author, description, rating} = req.body;
  Book.create({title, description, author, rating})
    .then(book => res.redirect(`/books/${book._id}`))
    .catch(err => console.log(err));
});


router.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  // get the book with this id
  Book.findById(bookId)
    .populate('author')
    .then(book => {
      console.log(book);
      // render a book details view
      res.render('bookDetails', {bookDetails: book});
    });
});


router.post('/books/edit/:id', (req, res) => {
  const bookId = req.params.id;
  const { title, author, description, rating } = req.body;
  Book.findByIdAndUpdate(bookId, {title, description, author, rating})
    .then(book => res.redirect(`/books/${book._id}`))
    .catch(err => console.log(err));
});

router.post('/books/:id/reviews', (req, res) => {
  const bookId = req.params.id;
  const { user, comments } = req.body;
  // Book.findByIdAndUpdate(bookId, {$push: {reviews: {user: user, comments: comments} }}).exec();
  Book.findOneAndUpdate({_id: bookId}, {$push: {reviews: {user: user, comments: comments} }})
    .then(book => res.redirect(`/books/${book._id}`))
    .catch(err => console.log(err));
});

module.exports = router;