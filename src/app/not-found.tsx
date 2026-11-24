import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFoundPage() {
  return (
    <PageContainer>
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <span className="font-mono text-7xl text-muted-foreground">404</span>
        <PageHeader
          title="Page not found"
          description="The page you are looking for doesn't exist or has moved. No flags here!"
          centered
          className="mb-4"
        />
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </PageContainer>
  );
}
