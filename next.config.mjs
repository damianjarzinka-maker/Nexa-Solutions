/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow phones/other devices on the local network to use the dev server
  // (hot reload included) via http://192.168.178.52:3000.
  allowedDevOrigins: ["192.168.178.52"],
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
export default nextConfig;
