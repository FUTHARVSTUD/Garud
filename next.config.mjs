/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@/uploads'] = path.resolve(__dirname, 'C:\Users\aksha\AppData\Local\Temp'); // Replace 'uploads' with your local video folder name
    }
    return config;
  },
};

export default nextConfig;
