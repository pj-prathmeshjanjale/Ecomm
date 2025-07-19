const express = require("express");
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

const router = express.Router();

router.use(authMiddleware.isAuthenticated).use(authMiddleware.isSeller);

// Handle product creation
router.post(
  "/create-product",
  upload.fields([{ name: "image", maxCount: 5 }]),
  productController.createProduct
);

module.exports = router;
