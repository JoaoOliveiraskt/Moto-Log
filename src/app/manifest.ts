import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Moto Log',
    short_name: 'MotoLog',
    description: 'Moto Log - Um e-commerce multi-vendor para compras e venda online',
    start_url: '/',
    display: 'standalone',
    background_color: '#121212',
    theme_color: '#121212',
    lang: 'pt-BR',
    icons: [
      {
        src: '/moto-log-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}