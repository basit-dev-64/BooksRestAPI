const express = require('express')
const router = new express.Router()


const naukriScrap = require('../controllers/naukri/naukriScrap')
router.get('/', (req, res) => {
  res.send('Job Scrapping Application')
})

// scraps frm naukri,
// requires title and location params in body
router.get('/api/naukri', naukriScrap)

module.exports = router
