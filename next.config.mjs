/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  // ... other configurations

  // Proxy configuration for development
  devServer: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
};

export default nextConfig;
