/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['randomuser.me'], // Add the domain here
    },
    experimental: {
      serverActions: {
        bodySizeLimit: "5mb",
      },
    },
  };
  
  export default nextConfig;
  