const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  filterTrailers,
  getUserTrailers,
  updateTrailer,
  deleteTrailer,
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

module.exports = router;
