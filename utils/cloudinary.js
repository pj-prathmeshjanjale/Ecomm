const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
require("dotenv").config();
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadOnCloudinary = async (localfilepath) => {
        try {
            if(!localfilepath) return null
            //upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localfilepath,{
                resource_type:"auto"
            })
            //file uploaded successfully
            console.log("file is uploaded on cloudinary",response.secure_url)
            return response;
        } catch (error) {
            fs.unlinkSync(localfilepath)//remove the locally save temp file as the upload operation got failed
            return null;
        }
    }

module.exports = { uploadOnCloudinary };
