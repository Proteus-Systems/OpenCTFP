import { SignUpForm } from "@/components/auth/signup-form";
import { PageContainer } from "@/components/page-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUpPage() {
  return (
    <PageContainer>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-sm">
          <SignUpForm />
        </div>
      </div>
    </PageContainer>
  );
}
