import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto grid h-16 max-w-full grid-cols-[1fr_auto_1fr] items-center border-b px-5 py-2">
        <span className="font-mono text-2xl">
          <Link href="/">OpenCTFP</Link>
        </span>
        <div>
          <MainNav />
        </div>
        <div className="hidden flex-row items-center justify-end gap-2 justify-self-end md:flex">
          <ThemeToggle />
          <UserMenu />
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
