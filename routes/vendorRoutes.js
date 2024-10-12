// routes/vendorRoutes.js
const express = require('express');
const vendorController = require('../controllers/vendorController'); // Import the vendor controller

const router = express.Router(); // Create a new router instance

// Define the POST route for vendor registration
router.post('/register', vendorController.vendorRegister); 
router.post('/login', vendorController.vendorLogin);


// Export the router
module.exports = router;
