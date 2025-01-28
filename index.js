const express = require('express');
const bodyParser = require('body-parser');
const books = require('./data.json')

const app = express();
app.use(bodyParser.json());

app.post('/books', (req, res) => {
  const {id, title, author,genere,year,copies} = req.body;
  if (!id || !title || !author || !genere || !year || !copies) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  else if(books.find(book => book.id === id)){
    return res.status(400).json({ message: 'Book already exists' });
  }
  else{
    newBook = { 
      id: id,
      title: title,
      author: author,
      genere: genere,
      year: year,
      copies: copies
  }
  books.push(newBook);
  res.status(201).json(newBook);
  }
  });

  app.get('/books', (req, res) => { //for all
    res.json(books);
  });

  app.get('/books/:id', (req, res) => { //for one
    const book = books.find(book => book.book_id === req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not in records' });
    }
    res.json(book);
  });

  app.put('/books/:id', (req, res) => {
    const book = books.find(book => book.book_id === req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not in records' });
    }
    book.id = req.body.id;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genere = req.body.genere;
    book.year = req.body.year;
    book.copies = req.body.copies;
    res.json(book);
  });

  app.delete('/books/:id', (req, res) => {
    const book = books.find(book => book.book_id === req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not in records' });
    }
    books = books.filter(book => book.id !== req.params.id);
    res.json({ message: 'Book deleted' });
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
