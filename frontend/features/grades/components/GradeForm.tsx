"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/shared/components/FormError";
import { gradeSchema } from "@/features/grades/schemas/gradeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

type FormValues = z.infer<typeof gradeSchema>;

interface GradeFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: FormValues;
}

export const GradeForm = ({ onSubmit, defaultValues }: GradeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(gradeSchema),
    mode: "onChange",
    defaultValues: {
      score: defaultValues?.score ?? 0,
      feedback: defaultValues?.feedback ?? "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
    >
      <Field>
        <FieldLabel htmlFor="score">Score</FieldLabel>
        <Input
          id="score"
          type="number"
          min={0}
          max={100}
          {...register("score", {
            valueAsNumber: true,
          })}
          placeholder="Enter score"
        />
        <FormError message={errors.score?.message} />
      </Field>

      <Field>
        <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
        <Textarea
          id="feedback"
          {...register("feedback")}
          placeholder="Enter feedback"
          rows={4}
        />
        <FormError message={errors.feedback?.message} />
      </Field>

      <Button type="submit" disabled={!isValid} className="self-end px-16">
        Submit
      </Button>
    </form>
  );
};
