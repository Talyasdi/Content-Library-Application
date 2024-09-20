const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  filterTrailers,
  getDistinctGenres,
  sortTrailers,
  getUserTrailers,
  updateTrailer,
  deleteTrailer,
} = require("../controllers/trailerController");

console.log('getDistinctGenres:', getDistinctGenres);

const router = express.Router();

//require authentication for all trailer routes
router.use(requireAuth);

// GET filter trailers
router.get("/trailers/filter", filterTrailers);

// GET distinct genres
router.get('/genres', getDistinctGenres);

// GET sort trailers
router.get("/trailers/sort", sortTrailers);

// GET user's trailers
router.get("/email", getUserTrailers);

// PUT - update user's trailer
router.put("/:id", updateTrailer);

// DELETE user's trailer
router.delete("/:id", deleteTrailer);

module.exports = router;
