const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware(
    '/api',
    {
      target: 'http://localhost:8080',
      pathRewrite: { '^/api': '/' }
    }
  ));
  app.use(createProxyMiddleware(
    '/heroku',
    {
      target: 'https://ferllowship-backend-testing.herokuapp.com',
      pathRewrite: { '^/heroku': '/' }
    }
  ));
}