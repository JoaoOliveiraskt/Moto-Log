/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
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
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "cdn.pixabay.com",
      },
      {
        hostname: "plus.unsplash.com"
      },
      {
        hostname: "cdn.dribbble.com"
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default nextConfig;
