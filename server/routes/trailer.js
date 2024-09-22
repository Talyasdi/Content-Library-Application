const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  filterTrailers,
  getDistinctGenres,
  getUserTrailers,
  updateTrailer,
  deleteTrailer,
  getTrailersByAge,
  getSingleTrailer
} = require("../controllers/trailerController");

console.log('getDistinctGenres:', getDistinctGenres);

const router = express.Router();

//require authentication for all trailer routes
router.use(requireAuth);

// GET filter trailers
router.get("/trailers/filter", filterTrailers);

// GET distinct genres
router.get('/genres', getDistinctGenres);

// GET user's trailers
router.get("/email", getUserTrailers);

// PUT - update user's trailer
router.put("/:id", updateTrailer);

// DELETE user's trailer
router.delete('/:id', deleteTrailer)

// GET all trailers
router.get('/trailers', getTrailersByAge)

// GET a single trailer
router.get('/trailers/:id', getSingleTrailer)

module.exports = router;