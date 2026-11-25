"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LogOutItem({ displayName }: { displayName?: string }) {
  const router = useRouter();

  const [pending, setPending] = useState(false);

  async function logOut() {
    setPending(true);
    await signOut(
      {},
      {
        onError: () => {
          setPending(false);
          toast.error("Log out failed, please try again later.");
        },
        onSuccess: () => {
          if (displayName) {
            toast(`Sad to see you go, ${displayName}`);
          } else {
            toast(`Goodbye.`);
          }
          router.push("/");
          router.refresh();
        },
      },
    );
  }

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={pending}
      onSelect={logOut}
      className="cursor-pointer"
    >
      <LogOut />
      {pending ? "Logging out..." : "Log out"}
    </DropdownMenuItem>
  );
}
