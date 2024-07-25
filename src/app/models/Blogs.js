const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

// Add plugin
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Blog = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    content: { type: String },
    image: { type: String, require: true },
    author: { type: String, require: true },
    quote: { type: String },
    tags: { type: Array },
    date: { type: Date },
    slug: { type: String, slug: 'title', unique: true },
  },
  {
    // _id: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('Blog', Blog);
