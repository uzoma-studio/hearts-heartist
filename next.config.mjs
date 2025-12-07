/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: 'images.ctfassets.net',
      },
    ],
  },
};

export default nextConfig;
