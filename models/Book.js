const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author' // that is the name of the model that is id refers to
  },
  rating: Number
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;