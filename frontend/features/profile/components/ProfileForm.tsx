"use client";

import { useState } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/shared/components/FormError";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";

import { profileSchema } from "@/features/profile/schemas/profileSchema";
import {Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarSrc } from "@/features/profile/helpers/getAvatarSrc";

type FormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  onSubmit: (data: FormValues, avatar?: File) => void;
  defaultValues?: FormValues;
  defaultAvatar?: string;
}

export const ProfileForm = ({
  onSubmit,
  defaultValues,
  defaultAvatar,
}: ProfileFormProps) => {
  const [avatar, setAvatar] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>(defaultAvatar);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      firstName: defaultValues?.firstName ?? "",
      lastName: defaultValues?.lastName ?? "",
      bio: defaultValues?.bio ?? "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };


  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, avatar))}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col items-center gap-3">
        <Avatar className="h-24 w-24">
          <AvatarImage key={preview} src={getAvatarSrc(preview)} />
          <AvatarFallback className="text-xl overflow-hidden">
            avatar
          </AvatarFallback>
        </Avatar>

        <Input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleAvatarChange}
        />
      </div>

      <Field className="mt-4">
        <FieldLabel>First Name</FieldLabel>
        <Input {...register("firstName")} />
        <FormError message={errors.firstName?.message} />
      </Field>

      <Field>
        <FieldLabel>Last Name</FieldLabel>
        <Input {...register("lastName")} />
        <FormError message={errors.lastName?.message} />
      </Field>

      <Field>
        <FieldLabel>Bio</FieldLabel>
        <Input {...register("bio")} />
        <FormError message={errors.bio?.message} />
      </Field>

      <Button type="submit" disabled={!isValid} className="ml-auto">
        Save Profile
      </Button>
    </form>
  );
};
