"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/features/auth/schemas/signupSchema";
import { FormError } from "@/shared/components/FormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

type FormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit: (data: z.infer<typeof signupSchema>) => void;
}

export const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 mt-4 w-full"
    >
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input {...register("email")} placeholder="Email" />
        <FormError message={errors.email?.message} />
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input {...register("password")} placeholder="Password" />
        <FormError message={errors.password?.message} />
      </Field>
      <div className="flex flex-col sm:flex-row sm:gap-8">
        <Field>
          <FieldLabel htmlFor="firstName">First Name</FieldLabel>
          <Input {...register("firstName")} placeholder="First Name" />
          <FormError message={errors.firstName?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
          <Input {...register("lastName")} placeholder="Last Name" />
          <FormError message={errors.lastName?.message} />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="bio">Bio</FieldLabel>
        <Input {...register("bio")} placeholder="Bio" />
        <FormError message={errors.bio?.message} />
      </Field>

      <Button type="submit" className="self-end px-12" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
};
