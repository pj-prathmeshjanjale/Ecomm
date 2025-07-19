const multer = require("multer");
const path = require("path");

// Folder to store temporary uploads
const tempFolder = path.join(__dirname, "../public/temp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempFolder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `image-${Date.now()}${ext}`;
    cb(null, name);
  },
});



const upload = multer({ storage: storage })
module.exports= upload 