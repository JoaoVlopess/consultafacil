/** @type {import('next').NextConfig} */
const nextConfig = {
  // Define o diretório raiz para o Turbopack, garantindo que seja a pasta atual.
  // O valor '.' aponta para o diretório onde este next.config.js reside.
  turbopack: {
    root: './', 
  },
};

module.exports = nextConfig;