import { LogOutItem } from "@/components/auth/log-out-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import * as Dropdown from "@/components/ui/dropdown-menu";
import { getSession } from "@/lib/session";
import { getInitials } from "@/lib/utils";
import Link from "next/link";

export async function UserMenu() {
  const session = await getSession();

  if (!session) {
    return (
      <div className="flex items-center justify-center">
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }
  const user = session.user;
  const userInitials = getInitials(user.name);
  return (
    <Dropdown.DropdownMenu>
      <Dropdown.DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer rounded-full"
        >
          <Avatar>
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </Dropdown.DropdownMenuTrigger>
      <Dropdown.DropdownMenuContent align="end" className="min-w-56">
        <Dropdown.DropdownMenuLabel>
          <p className="text-base text-foreground">{user.name}</p>
          <p className="font-mono text-xs text-muted-foreground">
            {user.email}
          </p>
        </Dropdown.DropdownMenuLabel>
        <Dropdown.DropdownMenuSeparator />
        <LogOutItem displayName={user.name} />
      </Dropdown.DropdownMenuContent>
    </Dropdown.DropdownMenu>
  );
}
