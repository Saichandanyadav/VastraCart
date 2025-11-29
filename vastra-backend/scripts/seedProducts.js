require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const products = require('./seedProductsData');

const run = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded products');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
