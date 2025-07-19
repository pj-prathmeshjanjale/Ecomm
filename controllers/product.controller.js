const path = require('path');
const fs = require('fs');
const { uploadOnCloudinary } = require("../utils/cloudinary");
const productModel = require("../models/product.model");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.files || !req.files.image || req.files.image.length === 0) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadedImages = [];

    for (const file of req.files.image) {
      const localPath = path.resolve(file.path);

      const result = await uploadOnCloudinary(localPath);
      
      if (result?.secure_url) {
        uploadedImages.push(result.secure_url);
      }

      //  Delete file after upload (whether success or fail)
      fs.unlink(localPath, (err) => {
        if (err) console.error(" Failed to delete temp file:", err);
       //else console.log(" Temp file deleted:", localPath);
      });
    }

    //console.log(" Uploaded URLs:", uploadedImages);

    const product = await productModel.create({
      name,
      description,
      price,
      images: uploadedImages,
      seller: req.user._id,
    });

    res.status(201).json({
      message: "Product created sucessfully",
      product,
    });

  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: error.message });
  }
};
