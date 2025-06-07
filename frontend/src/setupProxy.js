const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy for packages endpoint (root path)
  app.use(
    '/api-root',
    createProxyMiddleware({
      target: 'https://tubbybuddy.westus.cloudapp.azure.com:8443',
      pathRewrite: {'^/api-root': '/'},
      changeOrigin: true,
      secure: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  );
  
  // Proxy for other API endpoints
  app.use(
    ['/tickets', '/accoms'],
    createProxyMiddleware({
      target: 'https://tubbybuddy.westus.cloudapp.azure.com:8443',
      changeOrigin: true,
      secure: false
    })
  );
};