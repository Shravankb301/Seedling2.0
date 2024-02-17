const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection string
const mongoURI = process.env.MONGODB_URI;

// MongoDB client
const client = new mongodb.MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');

    // Express route to handle form submission
    app.post('/submit', async (req, res) => {
      try {
        const db = client.db(process.env.DB_NAME || 'DATABASE');
        const collection = db.collection(process.env.COLLECTION_NAME || 'Collection');

        // Insert the form data into MongoDB
        await collection.insertOne({ data: req.body.textareaData });

        // Send a success response
        res.status(200).send('Form data submitted successfully!');
        console.log('Made entry to the database');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
  })
  .catch(err => console.error(err));

// Serve your HTML and other static files
app.use(express.static('public'));

// Graceful shutdown
process.on('SIGINT', () => {
  client.close().then(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
