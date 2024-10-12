// index.js
const express = require("express");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes"); // Import vendor routes
const dotenv = require("dotenv"); // Fixed the import name
const firmRoutes = require('./routes/firmRoutes');

const app = express();
const PORT = process.env.PORT || 4000; // Use environment variable for port

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/userids', { // Use env variable for MongoDB URI
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch((error) => console.log('MongoDB Connection Error:', error));

// Middleware to parse JSON bodies
app.use(express.json()); // Use express's built-in JSON parser
app.use('/vendor', vendorRoutes); // Use vendor routes
app.use('/firm', firmRoutes); // Use firm routes


// Define the home route
app.use('/home', (req, res) => { // Changed to app.get for clarity
    res.send("<h1>Welcome to Nsreddy Sweggy</h1>"); // Response for home route
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started and running at http://localhost:${PORT}`); // Log server start message
});
