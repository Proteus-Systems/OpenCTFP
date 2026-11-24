"use client";

import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer>
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <span>
          <TriangleAlert className="size-16 text-muted-foreground" />
        </span>
        <PageHeader
          title="Something went wrong"
          description="An unexpected error occurred"
          centered
          className="mb-4"
        />
        {error.digest && (
          <span className="mb-4 text-sm text-muted-foreground">
            Error ID: {error.digest}
          </span>
        )}
        <div className="flex gap-2">
          <Button onClick={reset}>Retry</Button>
          <Button asChild variant="outline">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
