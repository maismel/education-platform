"use client";

import { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateForm } from "@/features/auth/utils/validate";
import { PasswordInput } from "@/features/auth/components/PasswordInput";

interface SignupFormProps {
  onSubmit: (email: string, password: string) => void;
}

export const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = validateForm(email, password);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <form
      autoComplete="on"
      onSubmit={handleSubmit}
      className="w-full max-w-xs sm:max-w-xl flex flex-col gap-8"
    >
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>

      <Button type="submit" className="w-3xs self-end" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
};
