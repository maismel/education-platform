"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder = "Password", ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="pr-10"
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
          onClick={() => setShow((v) => !v)}
        >
          {show ? (
            <EyeOff className="w-4 h-4 text-foreground/60" />
          ) : (
            <Eye className="w-4 h-4 text-foreground/60" />
          )}
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
