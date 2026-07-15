/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "api.dicebear.com",
            },
        ],
    },
};

export default nextConfig;
