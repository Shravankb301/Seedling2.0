const express = require('express');
const mongodb = require('mongodb');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection string
const mongoURI = 'mongodb+srv://sravankb301:nlT9Av7ieXYHhgQk@cluster0.0y90ylo.mongodb.net/';
const client = new mongodb.MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');

    // Express route to handle form submission
    app.post('/submit', async (req, res) => {
      try {
        const db = client.db('DATABASE');
        const collection = db.collection('Collection');

        // Insert the form data into MongoDB
        await collection.insertOne({
           data1: req.body.textareaData1,
           data2: req.body.textareaData2 
          });

        // Send a success response
        res.status(200).send('Form data submitted successfully!');
        console.log('made entry');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
  })
  .catch(err => console.error(err));

// Serve your HTML and other static files
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
