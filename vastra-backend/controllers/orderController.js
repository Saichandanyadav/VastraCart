const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const sendEmail = require('../utils/email');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

exports.checkout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: 'No items to checkout' });
    }

    const items = await Promise.all(
      user.cart.map(async ci => {
        const p = await Product.findById(ci.product);
        return {
          product: p._id,
          name: p.name,
          price: p.price,
          size: ci.size,
          quantity: ci.quantity
        };
      })
    );

    const totalPrice = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

    const order = new Order({
      user: req.user._id,
      items,
      totalPrice,
      orderDate: Date.now()
    });
    await order.save();

    user.cart = [];
    await user.save();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; border: 2px solid #4F46E5; padding: 20px; border-radius: 12px; max-width: 600px; margin: auto;">
        <h2 style="color: #4F46E5; text-align: center;">✅ Order Confirmation — #${order._id}</h2>
        <p>Hi <span style="color: #4F46E5; font-weight: bold;">${req.user.name}</span> 👋,</p>
        <p>Thank you for shopping with us! Here’s a summary of your order:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background-color: #EDE9FE;">
              <th style="padding: 8px; border: 1px solid #D1D5DB; text-align: left;">Product</th>
              <th style="padding: 8px; border: 1px solid #D1D5DB; text-align: center;">Size</th>
              <th style="padding: 8px; border: 1px solid #D1D5DB; text-align: center;">Qty</th>
              <th style="padding: 8px; border: 1px solid #D1D5DB; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(it => `
              <tr>
                <td style="padding: 8px; border: 1px solid #D1D5DB;">${it.name}</td>
                <td style="padding: 8px; border: 1px solid #D1D5DB; text-align: center;">${it.size}</td>
                <td style="padding: 8px; border: 1px solid #D1D5DB; text-align: center;">${it.quantity}</td>
                <td style="padding: 8px; border: 1px solid #D1D5DB; text-align: right; color: #4F46E5;">₹${it.price}</td>
              </tr>`).join('')}
            <tr>
              <td colspan="3" style="padding: 8px; border: 1px solid #D1D5DB; text-align: right; font-weight: bold;">Total</td>
              <td style="padding: 8px; border: 1px solid #D1D5DB; text-align: right; font-weight: bold; color: #16A34A;">₹${totalPrice}</td>
            </tr>
          </tbody>
        </table>
        <p style="margin-top: 16px;">Order ID: <strong>${order._id}</strong></p>
        <p>Order Date: ${new Date(order.orderDate).toLocaleString()}</p>
        <div style="text-align: center; margin-top: 20px;">
          <a href="${FRONTEND_URL}/orders" style="display:inline-block; padding: 12px 24px; background-color: #4F46E5; color: #fff; border-radius: 8px; text-decoration: none; font-weight: bold;">
            📦 View My Orders
          </a>
        </div>
        <p style="margin-top: 20px; color: #6B7280; text-align: center;">— VastraCart</p>
      </div>
    `;

    await sendEmail({
      to: req.user.email,
      subject: `Order Confirmation from VastraCart — #${order._id}`,
      html: emailHtml
    });

    res.status(201).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during checkout' });
  }
};

exports.getOrdersForUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
