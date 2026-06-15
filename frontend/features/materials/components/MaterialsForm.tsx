"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

type FormValues = {
  file: FileList;
  comment: string;
};

interface MaterialsFormProps {
  onSubmit: (data: { file: File; comment?: string }) => Promise<void> | void;
}

export const MaterialsForm = ({ onSubmit }: MaterialsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const submit = async (data: FormValues) => {
    const file = data.file?.[0];

    if (!file) return;

    await onSubmit({
      file,
      comment: data.comment.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      <Field>
        <FieldLabel>File</FieldLabel>
        <Input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          {...register("file", {
            required: true,
          })}
        />
      </Field>

      <Field>
        <FieldLabel>Comment</FieldLabel>
        <Textarea placeholder="Optional comment" {...register("comment")} />
      </Field>

      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="self-end px-24"
      >
        Upload
      </Button>
    </form>
  );
};
