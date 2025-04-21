/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove standalone output mode which is causing the error
  // Help ensure proper error handling
  experimental: {
    // This makes sure error and not-found pages are properly handled
    missingSuspenseWithCSRBailout: false
  }
};

export default nextConfig;
