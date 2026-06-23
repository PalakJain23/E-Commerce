const Product = require("../models/Product");
const fs = require("fs");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categories", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.images.forEach((img) => {
      if (fs.existsSync(img.url.replace("http://localhost:5000/", ""))) {
        fs.unlinkSync(img.url.replace("http://localhost:5000/", ""));
      }
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPLOAD ONE IMAGE
const uploadProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const image = {
      url: `http://localhost:5000/uploads/${req.file.filename}`,
      filename: req.file.filename,
      order: product.images.length + 1,
    };

    product.images.push(image);
    await product.save();

    res.status(200).json({
      message: "Image uploaded successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE IMAGE
const deleteProductImage = async (req, res) => {
  try {
    const { productId, imageId } = req.params;

    const product = await Product.findById(productId);

    const image = product.images.id(imageId);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const filePath = `uploads/${image.filename}`;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    product.images = product.images.filter(
      (img) => img._id.toString() !== imageId
    );

    await product.save();

    res.status(200).json({
      message: "Image deleted successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MOVE IMAGE UP
const moveImageUp = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    const index = product.images.findIndex(
      (img) => img._id.toString() === req.params.imageId
    );

    if (index > 0) {
      const temp = product.images[index];
      product.images[index] = product.images[index - 1];
      product.images[index - 1] = temp;
    }

    await product.save();

    res.status(200).json({
      message: "Image moved up",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const publishProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.images || product.images.length === 0) {
      return res.status(400).json({
        message: "Upload at least one image before adding product to website",
      });
    }

    product.isPublished = true;
    await product.save();

    res.status(200).json({
      message: "Product added to website successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MOVE IMAGE DOWN
const moveImageDown = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    const index = product.images.findIndex(
      (img) => img._id.toString() === req.params.imageId
    );

    if (index < product.images.length - 1) {
      const temp = product.images[index];
      product.images[index] = product.images[index + 1];
      product.images[index + 1] = temp;
    }

    await product.save();

    res.status(200).json({
      message: "Image moved down",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  deleteProductImage,
  moveImageUp,
  moveImageDown,
  publishProduct,
};