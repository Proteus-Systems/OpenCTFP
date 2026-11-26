import { PageContainer } from "@/components/page-container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </PageContainer>
  );
}
