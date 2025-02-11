"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DashboardLinks } from "./dashboard-links";

interface Props {
  storeSlug: string;
}

export default function NavLinks({ storeSlug }: Props) {
  const pathName = usePathname();
  const router = useRouter();

  const links = DashboardLinks({ storeSlug });

  return (
    <nav className="flex items-center space-x-6">
      {links.map((link) => {
        const isActive = pathName.startsWith(link.href);
        return (
          <Link
            key={link.href}
            onMouseEnter={() => router.prefetch(link.href)}
            className={cn(
              "text-muted-foreground h-9 flex items-center transition-colors pb-2 mt-4",
              isActive
                ? "border-b border-foreground rounded-none !text-foreground"
                : "hover:text-foreground relative after:absolute after:bg-foreground after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 "
            )}
            href={link.href}
          >
            <link.icon size={16} />
            <span className="ml-2 text-sm">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
