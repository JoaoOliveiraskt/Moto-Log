/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.imgur.com",
      },
      {
        hostname: "cloudflare-ipfs.com",
      },
      {
        hostname: "fakestoreapi.com",
      },
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "landingfoliocom.imgix.net",
      },
    ],
  },
};

export default nextConfig;
