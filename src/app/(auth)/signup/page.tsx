import { SignUpForm } from "@/components/auth/signup-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
