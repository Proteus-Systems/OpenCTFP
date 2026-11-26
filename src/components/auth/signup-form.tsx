"use client";
import { Button } from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { PasswordInput } from "../password-input";

export function SignUpForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordRep, setPasswordRep] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (password !== passwordRep) {
      setError("Passwords must be the same.");
      return;
    }

    setPending(true);

    await signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError: (ctx) => {
          setPending(false);
          setError(ctx.error.message);
        },
        onSuccess: (ctx) => {
          toast.success(`Welcome, ${ctx.data.user.name}`);
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
            <h1 className="text-3xl font-bold">Sign up</h1>
          </Card.CardTitle>
        </Card.CardHeader>
        <Card.CardContent className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Display name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Alex Smith"
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <PasswordInput
              name="password"
              id="password"
              placeholder="********"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password-rep">Repeat password</Label>
            <PasswordInput
              name="password-rep"
              id="password-rep"
              placeholder="********"
              autoComplete="new-password"
              onChange={(e) => setPasswordRep(e.target.value)}
              required
            />
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
            {pending ? "Creating account..." : "Sign up"}
          </Button>
          <span className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              className="transition duration-300 hover:text-foreground hover:underline"
              href="/login"
            >
              Log in
            </Link>
          </span>
        </Card.CardFooter>
      </form>
    </Card.Card>
  );
}
