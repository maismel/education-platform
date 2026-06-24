"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { loginSchema } from "@/features/auth/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { FormError } from "@/shared/components/FormError";

type FormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const submitHandler = (data: FormValues) => {
    onSubmit(data.email, data.password);
  };

  return (
    <form
      autoComplete="on"
      onSubmit={handleSubmit(submitHandler)}
      className="w-full max-w-xs sm:max-w-xl flex flex-col gap-1"
    >
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input {...register("email")} placeholder="Email" />
        <FormError message={errors.email?.message} />
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <PasswordInput
          {...register("password")}
          placeholder="Password"
        />
        <FormError message={errors.password?.message} />
      </Field>

      <Button type="submit" className="w-3xs self-end" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
};
