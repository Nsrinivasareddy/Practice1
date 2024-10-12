// models/Vendor.js
const mongoose = require('mongoose');

// Define the schema for the Vendor
const vendorSchema = new mongoose.Schema({
    fstn: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the created date
    },
    firm:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
        

    }]
});
// Export the Vendor model
const vendor = mongoose.model('vendor', vendorSchema);
module.exports = vendor
