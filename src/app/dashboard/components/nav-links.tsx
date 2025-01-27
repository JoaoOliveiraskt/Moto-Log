"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DashboardLinks } from "./dashboard-links";

interface Props {
  storeSlug: string;
}

export default function NavLinks({ storeSlug }: Props) {
  const pathName = usePathname();

  const links = DashboardLinks({ storeSlug });

  return (
    <nav className="flex items-center space-x-6">
      {links.map((link) => {
        const isActive = pathName.startsWith(link.href);
        return (
          <Link
            key={link.href}
            className={cn(
              "text-muted-foreground h-9 flex items-center transition-colors pb-2 ",
              isActive
                ? "border-b border-sky-600 rounded-none !text-sky-600"
                : "hover:text-sky-600 relative after:absolute after:bg-sky-600 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 "
            )}
            href={link.href}
          >
            <link.icon size={20} />
            <span className="ml-2 text-sm font-semibold">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
