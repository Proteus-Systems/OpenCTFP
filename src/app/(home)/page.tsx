import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <PageContainer>
      <PageHeader title="Home" />
      <Button asChild>
        <Link href="/events">Events</Link>
      </Button>
    </PageContainer>
  );
}
