/** @type {import('next').NextConfig} */

// Security headers for every route. The CSP is deliberately limited to
// non-breaking directives: restricting script-src would need nonces for
// Next's inline scripts and would break the desktop-only Spline / Unicorn
// Studio layers (remote wasm, workers, blob URLs).
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value:
      "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  },
];

const nextConfig = {
  // Allow phones/other devices on the local network to use the dev server
  // (hot reload included) via http://192.168.178.52:3000.
  allowedDevOrigins: ["192.168.178.52"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
export default nextConfig;
