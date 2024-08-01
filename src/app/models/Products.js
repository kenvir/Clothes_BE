const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    _id: { type: Number },
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
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    _id: false,
    timestamps: true,
  },
);

// Add custom query helpers
Product.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const isValidType = ['asc', 'desc'].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : 'desc',
    });
  }

  return this;
};

// Add field _id auto desc in first schema
Product.plugin(AutoIncrement, { id: 'product_counter', inc_field: '_id' });

// Add plugin
mongoose.plugin(slug);

// Product.plugin(AutoIncrement);
Product.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Product', Product);
