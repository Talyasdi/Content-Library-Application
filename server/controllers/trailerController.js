const Trailer = require('../models/trailerModel');

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

//get all trailers
const getAllTrailers = async (req, res) => {
    try {
        const trailers = await Trailer.find();
        //check if no trailers found
        if (trailers.length === 0) {
            console.log('No trailers found');
            res.status(404).json({ msg: 'No trailers found'});
        }
        console.log('Trailers fetched from DB:', trailers); 
        res.status(200).json(trailers);
    } catch (err) {
        console.error('Error getting trailers:', err);
        res.status(400).json({ msg: 'Error getting trailers', err });
    }
  };


//get a single trailer
//suppose that name is unique
const getSingleTrailer = async (req, res) => {
    const {trailerName} = req.params;

    try {
        const trailer = await Trailer.findOne({trailerName:trailerName});
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
  const { email } = req.query;
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit);
  if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  try {
    const totalCount = await Trailer.countDocuments({ userEmail: email });
    const trailers = await Trailer.find({ userEmail: email })
      .skip((page - 1) * limit)
      .limit(limit);
    res.setHeader('x-total-count', totalCount);
    res.setHeader('Access-Control-Expose-Headers', 'x-total-count');
    res.json(trailers);
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
