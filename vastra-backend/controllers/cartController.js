const User = require('../models/User');
const Product = require('../models/Product');

const findUserAndPopulateCart = async (userId) => {
  return User.findById(userId).populate('cart.product').exec();
};

exports.getCart = async (req, res) => {
  try {
    const user = await findUserAndPopulateCart(req.user._id);
    res.json(user.cart || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, size, quantity = 1 } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let user = await User.findById(req.user._id);
    const existing = user.cart.find(
      item => item.product.toString() === productId && item.size === size
    );
    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      user.cart.push({ product: productId, size, quantity });
    }
    
    await user.save();
    
    user = await findUserAndPopulateCart(req.user._id); 
    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCartItem = async (req, res) => {
  const { productId, size, quantity } = req.body;
  try {
    let user = await User.findById(req.user._id);
    const item = user.cart.find(i => i.product.toString() === productId && i.size === size);
    if (!item) return res.status(404).json({ message: 'Cart item not found' });

    if (quantity <= 0) {
      user.cart = user.cart.filter(i => !(i.product.toString() === productId && i.size === size));
    } else {
      item.quantity = Number(quantity);
    }
    
    await user.save();
    
    user = await findUserAndPopulateCart(req.user._id); 
    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeCartItem = async (req, res) => {
  const { productId, size } = req.body;
  try {
    let user = await User.findById(req.user._id);
    user.cart = user.cart.filter(i => !(i.product.toString() === productId && i.size === size));
    
    await user.save();
    
    user = await findUserAndPopulateCart(req.user._id);
    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};