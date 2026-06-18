"use client";

import { useLogin } from "@/features/auth/api/useLogin";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const { mutateAsync: login } = useLogin();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password });
      
      toast.success("You have successfully logged in");
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      toast.error(typeof err === "string" ? err : "Something went wrong");
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
