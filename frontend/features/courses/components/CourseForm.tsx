import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AppSelect, Option } from "@/shared/components/AppSelect";
import { courseSchema } from "@/features/courses/schemas/courseSchema";
import { FormError } from "@/shared/components/FormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useWatch } from "react-hook-form";

type FormValues = z.infer<typeof courseSchema>

interface CourseFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: FormValues;
  teacherOptions?: Option[];
}

export const CourseForm = ({
  onSubmit,
  defaultValues,
  teacherOptions,
}: CourseFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(courseSchema),
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      imageUrl: defaultValues?.imageUrl ?? "",
      teacherId: "",
    },
  });

  const teacherId = useWatch({
    control,
    name: "teacherId",
  });

  const isTeacherValid = teacherOptions ? !!teacherId : true;
  const canSubmit = isValid && isTeacherValid;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 mt-4"
    >
      <Field>
        <FieldLabel htmlFor="courseTitle">Course Title</FieldLabel>
        <Input {...register("title")} placeholder="Course Title" />
        <FormError message={errors.title?.message} />
      </Field>

      <Field>
        <FieldLabel htmlFor="courseDescription">Course Description</FieldLabel>
        <Input {...register("description")} placeholder="Course Description" />
        <FormError message={errors.description?.message} />
      </Field>

      {teacherOptions && (
        <Field>
          <FieldLabel>Teacher</FieldLabel>

          <Controller
            control={control}
            name="teacherId"
            render={({ field }) => (
              <AppSelect
                value={field.value}
                onChange={field.onChange}
                options={teacherOptions}
                placeholder="Select teacher"
              />
            )}
          />

          <FormError message={errors.teacherId?.message} />
        </Field>
      )}

      <Field>
        <FieldLabel>Image URL</FieldLabel>
        <Input
          {...register("imageUrl")}
          placeholder="https://example.com/image.jpg"
        />
        <FormError message={errors.imageUrl?.message} />
      </Field>

      <Button
        type="submit"
        disabled={!canSubmit}
        className="flex gap-2 ml-auto px-16"
      >
        Submit
      </Button>
    </form>
  );
};
