const blogsRouter = require('./blogs');
const productsRouter = require('./products');
const meRouter = require('./me');
const siteRouter = require('./site');

function route(app) {
  app.use('/blogs', blogsRouter);
  app.use('/products', productsRouter);
  app.use('/me', meRouter);

  app.use('/', siteRouter);
}

module.exports = route;
