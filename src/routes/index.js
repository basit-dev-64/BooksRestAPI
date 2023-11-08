const express = require('express')
const { getAllBooks, deleteBookbyId, addNewBook, updateBookbyId, getBookbyId } = require('../controllers/Books/crud')
const router = new express.Router()

router.get('/', (req, res) => {
  res.send('Books Application')
})

router.post('/api/books',addNewBook)
router.get('/api/books', getAllBooks)
router.get('/api/books/:id',getBookbyId)
router.put('/api/books/:id',updateBookbyId)
router.delete('/api/books/:id',deleteBookbyId)

module.exports = router
