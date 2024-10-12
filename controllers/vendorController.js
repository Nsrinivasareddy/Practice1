// controllers/vendorController.js
const vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.WHAT_IS_YOUR_NAME


const vendorRegister =  async(req, res)=> {
    const {fstn, username, email, password, createdAt} = req.body;
    try{
        const vendorEmail = await vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("Email already taken");
        }
        const  hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new vendor({
            fstn,
            username,
            email,
            password: hashedPassword,
            createdAt
        });
        await newVendor.save();
        res.status(201).json({message: "Vendor registered Successfully"});
        console.log('Registered new vendor:', username);
    } catch (error) {
        console.error("Error during registration:", error); // More specific log
        res.status(500).json({ error: error.message || "Internal server error" });
    }

};


const vendorLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the vendor by email
        const foundVendor = await vendor.findOne({ email }); // Using 'foundVendor' to avoid conflicts
        if (!foundVendor || !(await bcrypt.compare(password, foundVendor.password))) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Create a JWT token (optional)
        const token = jwt.sign({ vendorid: foundVendor._id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({
            success: "Login successful",
            token, // Include token in response

            vendor: {
                username: foundVendor.username,
                email: foundVendor.email,
                fstn: foundVendor.fstn,
                createdAt: foundVendor.createdAt,
                password: foundVendor.password
            }
        });
        console.log('Vendor logged in:', email, "This is token", token);

    } catch (error) {
        console.error("Error during login:", error); // More specific log
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

module.exports = { vendorRegister, vendorLogin }


//.env file
//MONGO_URI = "mongodb+srv://nsreddy:Nsreddy123@cluster0.rhkkv.mongodb.net/Nsreddy1?retryWrites=true&w=majority&appName=Cluster0"