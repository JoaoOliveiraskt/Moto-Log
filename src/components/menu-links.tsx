import Icon from "./icons/icon-component";
import { JSX } from "react";

export const getMenuItems = (
  isAuthenticated: boolean,
  isLojista: boolean,
  storeSlug: string
) => {
  const menuLinks = [
    ...(isLojista
      ? [
          {
            href: `/dashboard/store/${storeSlug}/products`,
            label: "Dashboard",
            icon: <Icon.dashboard size={16} />,
          },
        ]
      : []),
    isAuthenticated && {
      href: "/my-orders",
      label: "Compras",
      icon: <Icon.order size={16} />,
    },
    isAuthenticated && {
      href: "/following",
      label: "Seguindo",
      icon: <Icon.users size={16} />,
    },
    isAuthenticated && {
      href: "/favorites",
      label: "Favoritos",
      icon: <Icon.bookmark size={16} />,
    },
    !isLojista && {
      href: "/welcome-create-store",
      label: "Vender agora",
      icon: <Icon.sell size={16} />,
    },
    {
      href: "/community",
      label: "Comunidade",
      icon: <Icon.globe size={16} />,
    },
  ].filter((item): item is { href: string; label: string; icon: JSX.Element } =>
    Boolean(item)
  );

  return menuLinks;
};
