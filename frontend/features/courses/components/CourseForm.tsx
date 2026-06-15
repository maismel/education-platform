import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { courseSchema } from "@/features/courses/schemas/courseSchema";
import { FormError } from "@/features/shared/components/FormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

type FormValues = z.infer<typeof courseSchema>;

interface CourseFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: FormValues;
}

export const CourseForm = ({ onSubmit, defaultValues }: CourseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(courseSchema),
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      imageUrl: defaultValues?.imageUrl ?? "",
    },
  });

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

      <Field>
        <FieldLabel>Image URL</FieldLabel>
        <Input
          {...register("imageUrl")}
          placeholder="https://example.com/image.jpg"
        />
        <FormError message={errors.imageUrl?.message} />
      </Field>

      <Button type="submit" disabled={!isValid} className="flex gap-2 ml-auto px-16">
        Submit
      </Button>
    </form>
  );
};
