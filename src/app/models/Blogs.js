const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
  title: { type: String },
  description: { type: String },
  content: { type: String },
  image: { type: String },
  author: { type: String },
  quote: { type: String },
  tags: { type: Array },
  date: { type: Date },
});

module.exports = mongoose.model('Blog', Blog);
