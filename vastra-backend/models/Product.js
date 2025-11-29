const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, enum: ['Men','Women','Kids'], required: true },
  sizes: [{ type: String, enum: ['S','M','L','XL'] }],
  createdAt: { type: Date, default: Date.now }
});

ProductSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', ProductSchema);
