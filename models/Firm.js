// models/Firm.js
const mongoose = require('mongoose');

// Define the schema for the firm
const firmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
        required: true
    },
    category: {
        type: [
            {
                type: String,
                enum: ['veg', 'non-veg'],
                required: true // Make this required if needed
            }
        ]
    },
    region: {
        type: [
            {
                type: String,
                enum: ['south-indian', 'north-indian', 'chinese', 'bakery'], // Fixed "bekary" to "bakery"
                required: true // Make this required if needed
            }
        ]
    },
    offer: {
        type: String,
        default: '' // Optional: Default value if no offer is provided
    },
    image: {
        type: String
    },
    createdAt: { // Fixed typo here
        type: Date,
        default: Date.now // Automatically set the created date
    },
    vendor: { // Changed from vendors to vendor
        type: mongoose.Schema.Types.ObjectId, // Fixed Objectid to ObjectId
        ref: 'Vendor', // Ensure the reference matches the Vendor model name
        required: true // Optionally make this required
    }
});

// Export the Firm model
const Firm = mongoose.model('Firm', firmSchema);
module.exports = Firm;
