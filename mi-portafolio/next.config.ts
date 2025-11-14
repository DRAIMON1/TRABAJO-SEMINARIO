/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- AÑADE ESTE BLOQUE ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wrlzkceqmncferjhelft.supabase.co',
      },
    ],
  },
  // --- FIN DEL BLOQUE ---
};

export default nextConfig;