const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

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

// Add plugin
mongoose.plugin(slug);
Blog.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Blog', Blog);
