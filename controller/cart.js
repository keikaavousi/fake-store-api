const Cart = require('../model/cart');

exports.getAllCarts = async (_req, res) => {
  try {
    return res.json(await Cart.find());
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load carts.' });
  }
};

exports.getSingleCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ message: 'Cart not found.' });
    return res.json(cart);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid cart ID.' });
  }
};

exports.getCartsbyUserid = async (req, res) => {
  try {
    return res.json(await Cart.find({ userId: req.params.userid }));
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load this cart.' });
  }
};

exports.addOrUpdateCart = async (req, res) => {
  const { userId, products = [], productId, quantity = 1 } = req.body;
  const incomingProducts = products.length ? products : [{ productId, quantity }];

  if (!userId || incomingProducts.some((item) => !item.productId)) {
    return res.status(400).json({ message: 'A user and at least one product are required.' });
  }

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $setOnInsert: { userId, products: [] } },
      { new: true, upsert: true },
    );

    incomingProducts.forEach((incoming) => {
      const currentItem = cart.products.find(
        (item) => item.productId === String(incoming.productId),
      );
      if (currentItem) {
        currentItem.quantity = Math.max(1, currentItem.quantity + Number(incoming.quantity || 1));
      } else {
        cart.products.push({
          productId: String(incoming.productId),
          quantity: Math.max(1, Number(incoming.quantity || 1)),
        });
      }
    });

    await cart.save();
    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update the cart.' });
  }
};

exports.editCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { products: req.body.products },
      { new: true, runValidators: true },
    );
    if (!cart) return res.status(404).json({ message: 'Cart not found.' });
    return res.json(cart);
  } catch (error) {
    return res.status(400).json({ message: 'Unable to update the cart.' });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) return res.status(404).json({ message: 'Cart not found.' });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ message: 'Unable to delete the cart.' });
  }
};
