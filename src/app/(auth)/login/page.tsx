import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <PageContainer>
      <PageHeader title="Log in" />
    </PageContainer>
  );
}
