"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import * as Sheet from "@/components/ui/sheet";
import { UserMenu } from "@/components/user-menu";
import { links } from "@/lib/nav";
import { cn } from "cn";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="justify-self-end md:hidden">
      <Sheet.Sheet open={open} onOpenChange={setOpen}>
        <Sheet.SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </Sheet.SheetTrigger>
        <Sheet.SheetContent side="right">
          <Sheet.SheetHeader>
            <Sheet.SheetTitle>OpenCTFP</Sheet.SheetTitle>
          </Sheet.SheetHeader>
          <nav className="flex flex-col gap-5 px-4">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
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
          <Sheet.SheetFooter className="flex flex-row items-center justify-between">
            <ThemeToggle />
            <UserMenu onNavigate={() => setOpen(false)} />
          </Sheet.SheetFooter>
        </Sheet.SheetContent>
      </Sheet.Sheet>
    </div>
  );
}
