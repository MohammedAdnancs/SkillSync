/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure static export with proper handling of not-found pages
  output: 'standalone',
  // Help ensure proper error handling
  experimental: {
    // This makes sure error and not-found pages are properly handled
    missingSuspenseWithCSRBailout: false
  }
};

export default nextConfig;
