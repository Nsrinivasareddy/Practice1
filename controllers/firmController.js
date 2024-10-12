const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
//const path = require('path'); // Ensure path is imported for file extensions

// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
    }
 });

// Initialize multer with storage settings
const upload = multer({ storage });

// Function to add a firm
const addFirm = async (req, res) => {
    try {
        const { firmname, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined; // Get the image filename

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const firm = new Firm({
            firmname, area, category, region, offer, image, vendor: vendor._id
        });

        const savedFirm = await firm.save();
        vendor.firm.push(savedFirm._id); // Ensure you're pushing the firm ID
        await vendor.save();

        return res.status(200).json({ message: "Firm added successfully", firm: savedFirm });
    } catch (error) {
        console.error("Error adding firm:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Export the function with multer middleware for file uploads
module.exports = {
    addFirm: [upload.single('image'), addFirm]
};
