/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Vercel to correctly identify the api routes
  rewrites: async () => {
    return [
      { source: "/api/python", destination: "/api/python.py" },
      { source: "/api/php", destination: "/api/php.php" },
      { source: "/api/go", destination: "/api/go.go" },
      { source: "/api/rust", destination: "/api/rust.rs" },
    ];
  },
};

export default nextConfig;
