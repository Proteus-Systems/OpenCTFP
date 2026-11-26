import { SetupForm } from "@/components/auth/setup-form";
import { Skeleton } from "@/components/ui/skeleton";
import { needsSetup } from "@/lib/setup";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Set up",
};

export default function SetupPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <SetupGate />
    </Suspense>
  );
}

async function SetupGate() {
  if (!(await needsSetup())) {
    notFound();
  }
  return <SetupForm />;
}
