import { LoginForm } from "@/components/auth/login-form";
import { PageContainer } from "@/components/page-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <PageContainer>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </PageContainer>
  );
}
