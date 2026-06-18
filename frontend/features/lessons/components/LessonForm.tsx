"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DateInput } from "@/shared/components/DateInput";
import { TimeInput } from "@/shared/components/TimeInput";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { lessonSchema } from "@/features/lessons/schemas/lessonSchema";
import { FormError } from "@/shared/components/FormError";

type FormValues = z.infer<typeof lessonSchema>;

interface LessonFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: FormValues;
}

export const LessonForm = ({ onSubmit, defaultValues }: LessonFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(lessonSchema),
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      startsAtDate: defaultValues?.startsAtDate,
      startsAtTime: defaultValues?.startsAtTime,
      endsAtTime: defaultValues?.endsAtTime,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full"
    >
      <Field>
        <FieldLabel>Title</FieldLabel>
        <Input {...register("title")} />
        <FormError message={errors.title?.message} />
      </Field>

      <Field>
        <FieldLabel>Description</FieldLabel>
        <Input {...register("description")} />
        <FormError message={errors.description?.message} />
      </Field>

      {/* STARTS AT */}
      <Field>
        <FieldLabel>Start Date</FieldLabel>

        <Controller
          control={control}
          name="startsAtDate"
          render={({ field }) => (
            <DateInput
              value={field.value}
              onChange={field.onChange}
              placeholder="Select date"
            />
          )}
        />
        <FormError message={errors.startsAtDate?.message} />
      </Field>
      <div className="flex gap-4">
        <Field>
          <FieldLabel>Start At</FieldLabel>
          <Controller
            control={control}
            name="startsAtTime"
            render={({ field }) => (
              <TimeInput value={field.value} onChange={field.onChange} />
            )}
          />
          <FormError message={errors.startsAtTime?.message} />
        </Field>

        {/* ENDS AT */}
        <Field>
          <FieldLabel>Ends At</FieldLabel>

          <Controller
            control={control}
            name="endsAtTime"
            render={({ field }) => (
              <TimeInput value={field.value} onChange={field.onChange} />
            )}
          />
          <FormError message={errors.endsAtTime?.message} />
        </Field>
      </div>

      <Button type="submit" disabled={!isValid} className="self-end px-24">
        Submit
      </Button>
    </form>
  );
};
