const Book = require('../../models/books')

const addNewBook = async (req,res)=>{
    try {
        const { title, author, summary } = req.body;
        const book = new Book({ title, author, summary });
        const savedBook = await book.save();
        res.status(201).json(savedBook);
      } catch (err) {
        console.error(err)
        res.status(400).json({ error: err.message });
      }
}

const getAllBooks = async (req,res)=>{
    const books = await Book.find();
    res.json(books);
}

const getBookbyId = async (req,res)=>{
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
          res.status(404).json({ error: 'Book not found' });
          return;
        }
        res.json(book);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

const updateBookbyId = async (req,res)=>{
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
          res.status(404).json({ error: 'Book not found' });
          return;
        }
        res.json(updatedBook);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

const deleteBookbyId = async (req,res)=>{
    try {
        const deletedBook = await Book.deleteOne({_id:req.params.id});
        if (!deletedBook) {
          res.status(404).json({ error: 'Book not found' });
          return;
        }
        res.json(deletedBook);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

module.exports = {
    addNewBook,
    deleteBookbyId,
    updateBookbyId,
    getBookbyId,
    getAllBooks
}



