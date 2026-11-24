"use client";

import { links } from "@/lib/nav";
import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden flex-row items-center gap-5 md:flex">
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
