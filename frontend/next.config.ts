import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Adicione mais domínios aqui se precisar (ex: TMDB API no futuro)
      // {
      //   protocol: 'https',
      //   hostname: 'image.tmdb.org',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
};

export default nextConfig;