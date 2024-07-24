const blogsRouter = require('./blogs.js');
const siteRouter = require('./site.js');

function route(app) {
  app.use('/blogs/:slug', blogsRouter);
  app.use('/blogs', blogsRouter);
  app.use('/', siteRouter);
}

module.exports = route;
