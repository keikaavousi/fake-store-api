const Product = require('../model/product');

exports.getAllProducts = async (_req, res) => {
  try {
    res.json(await Product.find().sort({ id: 1 }));
  } catch (error) {
    res.status(500).json({ message: 'Unable to load products.' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      $or: [
        ...(Number.isNaN(Number(req.params.id)) ? [] : [{ id: Number(req.params.id) }]),
        ...(req.params.id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: req.params.id }] : []),
      ],
    });
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load the product.' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    return res.status(201).json(await Product.create(req.body));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getProductCategories = async (_req, res) => {
  try {
    return res.json(await Product.distinct('category'));
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load categories.' });
  }
};

exports.getProductsInCategory = async (req, res) => {
  try {
    return res.json(await Product.find({ category: req.params.category }).sort({ id: 1 }));
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load this category.' });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    return res.json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
