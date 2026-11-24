import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UserMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex items-center justify-center">
      <Button asChild>
        <Link href="/login" onClick={onNavigate}>
          Log in
        </Link>
      </Button>
    </div>
  );
}
