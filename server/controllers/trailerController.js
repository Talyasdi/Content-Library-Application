const Trailer = require('../models/trailerModel');
const User = require("../models/userModel");

// Function to filter trailers
const filterTrailers = async (req, res) => {
    try {
        const { genres, minAgeLimit, releaseYear } = req.query;

        let filter = {};

        if (genres) {
            filter.genres = { $in: genres.split(',') };
        }
        if (minAgeLimit) {
            filter.minAgeLimit = { $gte: minAgeLimit };
        }
        if (releaseYear) {
            filter.releaseYear = releaseYear;
        }

        const trailers = await Trailer.find(filter);
        res.status(200).json(trailers);
    } catch (error) {
        console.error('Error filtering trailers:', error); // Log the error for debugging
        res.status(400).json({ message: 'Error filtering trailers', error });
    }
};

  const getAllTrailers = async (req, res) => {
    const { age } = req.query; // Get age from query string
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 10; // Default limit to 10 if not provided
    
    if (!age) {
      return res.status(400).json({ msg: 'User age is required' });
    }
  
    try {
      const filter = {
        minAgeLimit: { $lte: age },  // Filter by age only
      };
      // Get total count of trailers matching the user' age limit
      const totalCount = await Trailer.countDocuments(filter);
  
      // Fetch trailers with pagination
      const trailers = await Trailer.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);
  
      // Set response headers
      res.setHeader('x-total-count', totalCount);
      res.setHeader('Access-Control-Expose-Headers', 'x-total-count');
  
      // Return the trailers
      res.json(trailers);
    } catch (err) {
      console.error('Error getting trailers: ', err);
      res.status(500).json({ msg: 'Error getting trailers' });
    }
  };

//get a single trailer
const getSingleTrailer = async (req, res) => {
    const {id} = req.params;

    try {
        const trailer = await Trailer.findById(id);
       if(!trailer){
        console.error('Error finding trailer');
        return res.status(404).json({msg: 'Trailer not found' });
        }
        res.status(200).json({trailer});
    } catch (err) {
        console.error('Error getting trailer: ', err);
        res.status(400).json({msg: 'error getting trailer: ', err})
    }
}

const getUserTrailers = async(req, res) => {
  const { user } = req.query;
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) ;
  if (!user) {
      return res.status(400).json({ message: 'Email is required' });
    }
  try {
    const totalCount = await Trailer.countDocuments({ userEmail: user.email });
    const trailers = await Trailer.find({ userEmail: user.email })
      .skip((page - 1) * limit)
      .limit(limit);
    res.setHeader('x-total-count', totalCount);
    res.setHeader('Access-Control-Expose-Headers', 'x-total-count');
    res.json(trailers);
    console.log(trailers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const updateTrailer = async (req, res) => {
  try {
    const trailerId = req.params.id; // Get the trailer ID from the URL params
    const updatedData = req.body;    // Get updated data from the request body

    // Find the trailer by ID and update it with new data
    const updatedTrailer = await Trailer.findByIdAndUpdate(trailerId, updatedData, { new: true });

    if (!updatedTrailer) {
      return res.status(404).json({ message: 'Trailer not found' });
    }

    res.json(updatedTrailer);
  } catch (err) {
    res.status(500).json({ message: 'Error updating trailer' });
  }
};

const deleteTrailer = async (req, res) => {
  try {
    const trailerId = req.params.id;  // Get the trailer ID from the URL params

    const deletedTrailer = await Trailer.findByIdAndDelete(trailerId);

    if (!deletedTrailer) {
      return res.status(404).json({ message: 'Trailer not found' });
    }

    res.json({ message: 'Trailer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting trailer' });
  }
};


module.exports = { 
    filterTrailers, 
    getSingleTrailer, 
    getAllTrailers,
    getUserTrailers, updateTrailer, deleteTrailer
};
