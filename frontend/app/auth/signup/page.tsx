"use client";

import { useSignup } from "@/features/auth/api/useSignup";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupPage() {
  const { mutateAsync: signup } = useSignup();
  const router = useRouter();

  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <SignupForm
        onSubmit={async (data) => {
          await signup(data);
          toast.success("You have successfully registered in");
          router.push("/dashboard");
        }}
      />
    </div>
  );
}
