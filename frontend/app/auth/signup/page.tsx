"use client";

import { useSignup } from "@/features/auth/api/useSignup";
import { SignupForm } from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  const { mutateAsync: signup } = useSignup();

  const handleSignup = async (email: string, password: string) => {
    try {
      await signup({ email, password });
    } catch (err) {
      console.error("Signup failed", err);
    }
  };
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <SignupForm onSubmit={handleSignup} />
    </div>
  );
}
