"use client";
import { Button } from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    setPending(true);

    await signIn.email(
      {
        email,
        password,
      },
      {
        onError: (ctx) => {
          setPending(false);
          setError(ctx.error.message);
        },
        onSuccess: (ctx) => {
          toast.success(`Welcome back, ${ctx.data.user.name}`);
          router.push("/");
          router.refresh();
        },
      },
    );
  }

  return (
    <Card.Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <Card.CardHeader>
          <Card.CardTitle>
            <h1 className="text-3xl font-bold">Log in</h1>
          </Card.CardTitle>
        </Card.CardHeader>
        <Card.CardContent className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="alex@example.com"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                type={visibility ? "text" : "password"}
                name="password"
                id="password"
                placeholder="********"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
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
          </div>
        </Card.CardContent>
        <Card.CardFooter className="flex flex-col items-center justify-center gap-3">
          {error && (
            <p role="alert" className="text-destructive">
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={pending}
            className="w-full cursor-pointer"
          >
            {pending ? "Logging in..." : "Log in"}
          </Button>
          <span className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              className="transition duration-300 hover:text-foreground hover:underline"
              href="/signup"
            >
              Sign up
            </Link>
          </span>
          <span className="text-center text-sm text-muted-foreground">
            Forgotten your password? Ask your event organiser for help resetting
            it.
          </span>
        </Card.CardFooter>
      </form>
    </Card.Card>
  );
}
