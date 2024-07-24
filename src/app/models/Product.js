const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String },
  price: { type: String },
  size: { type: String },
  color: { type: String },
  sale: { type: String },
  branch: { type: String },
  person: { type: String },
  tags: { type: Array },
  image: { type: Array },
  date: { type: Date },
});

module.exports = mongoose.model('Product', Product);
