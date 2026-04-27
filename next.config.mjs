/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Vercel to correctly identify the api routes
  rewrites: async () => {
    return [
      { source: "/api/python", destination: "/api/python/index.py" },
      { source: "/api/php", destination: "/api/php/index.php" },
      { source: "/api/go", destination: "/api/go/index.go" },
      { source: "/api/rust", destination: "/api/rust/index.rs" },
    ];
  },
};

export default nextConfig;
