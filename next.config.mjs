const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.100.5'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**'
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.com'
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      }
    ]
  },
  experimental: {}
};

export default nextConfig;
