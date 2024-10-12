// routes/firmRoutes.js
const express = require('express');
const firmController = require('../controllers/firmController'); // Ensure correct import
const verifyToken = require('../middlewares/verifyToken'); // Import the email verification middleware

const router = express.Router();

// Route to add a firm, first verifying the vendor's email
router.post('/add-firm', verifyToken, firmController.addFirm); // Ensure addFirm is a valid function

module.exports = router;




