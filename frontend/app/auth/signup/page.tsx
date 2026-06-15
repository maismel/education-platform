"use client";

import { useSignup } from "@/features/auth/api/useSignup";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const { mutateAsync: signup, isPending } = useSignup();

  const handleSignup = async (email: string, password: string) => {
    try {
      await signup({ email, password });

      router.push("/auth/login");
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
