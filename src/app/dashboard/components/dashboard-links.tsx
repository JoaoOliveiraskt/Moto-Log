import Icon from "@/components/icons/icon-component";

interface DashboardLinksProps {
  storeSlug?: string;
}

export const DashboardLinks = ({ storeSlug }: DashboardLinksProps) => {
  if (!storeSlug) return [];

  const links = [
    { name: "Produtos", icon: Icon.package, href: "/products" },
    { name: "Pedidos", icon: Icon.cart, href: "/orders" },
    { name: "Analíticos", icon: Icon.analytics, href: "/analytics" },
    { name: "Configurações", icon: Icon.settings, href: "/settings" },
  ];

  return links.map((link) => ({
    ...link,
    href: `/dashboard/store/${storeSlug}${link.href}`,
  }));
};
