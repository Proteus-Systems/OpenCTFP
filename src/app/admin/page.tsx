import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <PageContainer>
      <PageHeader title="Admin" />
    </PageContainer>
  );
}
