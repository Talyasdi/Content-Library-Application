const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trailerSchema = new Schema({
    trailerName: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    minAgeLimit: {
        type: Number,
        default: 1
    },
    releaseYear: {
        type: Number,
        required: true
    },
    cast: {
        type: [String]
    },
    link : {
        type: String,
        required: true
    },
    userEmail : {
        type: String,
        required: true
    },
    userName : {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Trailer', trailerSchema);