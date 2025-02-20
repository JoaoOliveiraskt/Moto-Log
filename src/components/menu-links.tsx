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
            icon: <Icon.dashboard size={20} />,
          },
        ]
      : []),
    isAuthenticated && {
      href: "/my-orders",
      label: "Compras",
      icon: <Icon.order size={20} />,
    },
    isAuthenticated && {
      href: "/following",
      label: "Seguindo",
      icon: <Icon.users size={20} />,
    },
    isAuthenticated && {
      href: "/favorites",
      label: "Favoritos",
      icon: <Icon.bookmark size={20} />,
    },
    !isLojista && {
      href: "/welcome-create-store",
      label: "Vender agora",
      icon: <Icon.sell size={20} />,
    },
  ].filter((item): item is { href: string; label: string; icon: JSX.Element } =>
    Boolean(item)
  );

  return menuLinks;
};
