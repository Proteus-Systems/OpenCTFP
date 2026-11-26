import { EmptyState } from "@/components/empty-state";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { Flag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
};

export default function EventsPage() {
  return (
    <PageContainer>
      <PageHeader title="Events" className="mb-8" />
      <EmptyState
        icon={Flag}
        title="No events found"
        description="Events will show up here when published"
      />
    </PageContainer>
  );
}
