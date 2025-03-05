import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Moto Log",
    short_name: "MotoLog",
    description:
      "Moto Log - Um e-commerce multi-vendor para compras e venda online",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0f",
    theme_color: "#f5f5f5",
    lang: "pt-BR",
    orientation: "portrait",
    categories: [
      "shopping",
      "e-commerce",
      "marketplace",
      "online-store",
      "online-shop",
    ],
    icons: [
      {
        src: "/moto-log-icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
