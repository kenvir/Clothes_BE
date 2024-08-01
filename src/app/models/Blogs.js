const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Blog = new Schema(
  {
    _id: { type: Number },
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
    _id: false,
    timestamps: true,
  },
);

// Add custom query helpers
Blog.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const isValidType = ['asc', 'desc'].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : 'desc',
    });
  }

  return this;
};

// Add field _id auto desc in first schema
Blog.plugin(AutoIncrement, { id: 'blog_counter', inc_field: '_id' });

// Add plugin
mongoose.plugin(slug);

Blog.plugin(AutoIncrement);
Blog.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Blog', Blog);
