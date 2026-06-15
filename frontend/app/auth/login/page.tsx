"use client";

import { useLogin } from "@/features/auth/api/useLogin";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: login } = useLogin();
  
  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password });

      router.push("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <SignupForm onSubmit={handleLogin} />
    </div>
  );
}
