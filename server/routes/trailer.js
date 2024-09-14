const express = require('express');
const { filterTrailers } = require('../controllers/trailerController')

const router = express.Router()

// Route to filter trailers
router.get('/trailers/filter', filterTrailers);

module.exports = router