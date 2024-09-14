const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

// Constants
const PORT = process.env.PORT;

// Create Express server
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);


app.use((req, res, next) => { // logger middleware
  console.log(req.path, req.method)
  next()
})

// Routes
app.use('/api/trailer', trailerRoute);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log("connected to mongoDB & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
