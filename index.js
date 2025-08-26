const http = require("http");
const httpProxy = require("http-proxy");

// Create proxy server
const proxy = httpProxy.createProxyServer({});

// Create HTTP server that uses the proxy
const server = http.createServer((req, res) => {
  // Forward everything to target
  proxy.web(req, res, { target: "http://15.206.92.180:3000/" });
});

server.listen(3001, () => {
  console.log("Proxy server running on http://localhost:3001");
});
