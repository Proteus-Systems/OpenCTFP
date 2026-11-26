"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "cn";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function PasswordInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "type">) {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="relative">
      <Input
        type={visibility ? "text" : "password"}
        {...props}
        className={cn("pr-10", className)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={visibility ? "Hide password" : "Show password"}
        onClick={() => setVisibility((prev) => !prev)}
        className="absolute inset-y-0 right-1 my-auto cursor-pointer"
      >
        {visibility ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
}
