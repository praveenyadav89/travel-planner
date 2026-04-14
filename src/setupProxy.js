const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // console.log("Proxy loaded");
  app.use(
    "/fsq",
    createProxyMiddleware({
      target: process.env.REACT_APP_FOURSQUARE_API_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/fsq": "",
      },
      onProxyReq: (proxyReq) => {
        proxyReq.setHeader(
          "authorization",
          `Bearer ${process.env.REACT_APP_FOURSQUARE_KEY}`,
        );
        // proxyReq.setHeader("X-Places-Api-Version", "2025-06-17");
        //proxyReq.setHeader("accept", "application/json");
      },
    }),
  );
};
