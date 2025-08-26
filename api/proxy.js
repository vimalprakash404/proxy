import { createProxyMiddleware } from "http-proxy-middleware";
import { createServer } from "@vercel/node";

// Target backend server (can be EC2, localhost, etc.)
const target = process.env.TARGET_URL || "http://localhost:5000";

// Create proxy
const proxy = createProxyMiddleware({
  target,
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", // remove /api before forwarding
  },
});

// Export Vercel serverless handler
export default function handler(req, res) {
  return proxy(req, res, (err) => {
    if (err) {
      res.status(500).json({ error: "Proxy error", details: err.message });
    }
  });
}
