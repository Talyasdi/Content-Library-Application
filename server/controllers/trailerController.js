const Trailer = require('../models/trailerModel');

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
        const trailer = await Trailer.findOne({trailerName: trailerName});
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

module.exports = { 
    filterTrailers, 
    getSingleTrailer, 
    getAllTrailers,
};