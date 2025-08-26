import { createProxyMiddleware } from "http-proxy-middleware";

// Backend server (your EC2 or other API)
const target = process.env.TARGET_URL || "http://localhost:5000";

const proxy = createProxyMiddleware({
  target,
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", // remove `/api` before forwarding
  },
});

// Vercel handler
export default function handler(req, res) {
  return proxy(req, res, (err) => {
    if (err) {
      res.status(500).json({ error: "Proxy error", details: err.message });
    }
  });
}
