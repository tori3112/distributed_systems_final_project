const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Create a more specific path for packages to avoid root path conflicts
  app.use(
    '/api/packages',
    createProxyMiddleware({
      target: 'https://tubbybuddy.westus.cloudapp.azure.com',
      pathRewrite: {'^/api/packages': '/'},
      changeOrigin: true,
      secure: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      logLevel: 'debug'
    })
  );
  
  // Keep your existing proxies for tickets and accommodations
  app.use(
    ['/tickets', '/accoms'],
    createProxyMiddleware({
      target: 'https://tubbybuddy.westus.cloudapp.azure.com:8443',
      changeOrigin: true,
      secure: false
    })
  );
};