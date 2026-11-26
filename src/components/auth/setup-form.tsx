"use client";

import { createOwner } from "@/app/(auth)/setup/actions";
import { PageHeader } from "@/components/page-header";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function SetupForm() {
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

    try {
      const result = await createOwner({ name, email, password });

      if (!result.success) {
        setError(result.message);
        setPending(false);
        return;
      }

      if (result.loggedIn) {
        toast.success(result.message);
        router.push("/");
        router.refresh();
      } else {
        toast(result.message);
        router.push("/login");
      }
    } catch {
      setError("Something went wrong, please try again later.");
      setPending(false);
    }
  }

  return (
    <Card.Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <Card.CardHeader>
          <Card.CardTitle>
            <PageHeader
              title="Create the owner account"
              description="This account can manage everything on the platform"
            />
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
              minLength={8}
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
            {pending ? "Creating owner account..." : "Create owner account"}
          </Button>
        </Card.CardFooter>
      </form>
    </Card.Card>
  );
}
