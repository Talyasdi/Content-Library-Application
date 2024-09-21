const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  filterTrailers,
  getUserTrailers,
  updateTrailer,
  deleteTrailer,
  getAllTrailers,
  getSingleTrailer
} = require("../controllers/trailerController");

const router = express.Router();

//require authentication for all trailer routes
router.use(requireAuth);

// Route to filter trailers
router.get("/trailers/filter", filterTrailers);

// GET user's trailers
router.get("/email", getUserTrailers);

// PUT - update user's trailer
router.put("/:id", updateTrailer);

// DELETE user's trailer
router.delete('/:id', deleteTrailer)

// GET all trailers
//router.get('/', getAllTrailers)
router.get('/trailers', getAllTrailers)

// GET a single trailer
router.get('/trailers/:id', getSingleTrailer)

module.exports = router;