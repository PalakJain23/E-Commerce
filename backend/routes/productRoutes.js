const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  deleteProductImage,
  moveImageUp,
  moveImageDown,
  publishProduct,
} = require("../controllers/productController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.put("/:id/publish", publishProduct);

router.post("/:id/images", upload.single("image"), uploadProductImage);
router.delete("/:productId/images/:imageId", deleteProductImage);
router.put("/:productId/images/:imageId/up", moveImageUp);
router.put("/:productId/images/:imageId/down", moveImageDown);

module.exports = router;