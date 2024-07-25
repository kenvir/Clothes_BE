const blogsRouter = require('./blogs');
const meRouter = require('./me');
const siteRouter = require('./site');

function route(app) {
  app.use('/blogs', blogsRouter);
  app.use('/me', meRouter);

  app.use('/', siteRouter);
}

module.exports = route;
