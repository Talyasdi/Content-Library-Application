
const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  filterTrailers,
  getUserTrailers,
  updateTrailer,
  deleteTrailer,
  checkTrailerExists, // NEW
  uploadTrailer // NEW
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
router.delete("/:id", deleteTrailer);

// POST - upload a new (user) trailer 
router.post('/',uploadTrailer);

// POST - check if trailer exists
router.post('/check-trailer', checkTrailerExists); // Add this line


module.exports = router;
