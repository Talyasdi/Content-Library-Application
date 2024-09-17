const express = require('express');
const { filterTrailers,
        getAllTrailers,
        getSingleTrailer
 } = require('../controllers/trailerController')

const router = express.Router()

// GET all trailers
//router.get('/', getAllTrailers)
router.get('/trailers', getAllTrailers)

// GET a single trailer
router.get('/trailers/:trailerName', getSingleTrailer)

// Route to filter trailers
router.get('/trailers/filter', filterTrailers);

module.exports = router