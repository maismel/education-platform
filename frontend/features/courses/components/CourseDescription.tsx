import Image from "next/image";
import { Course } from "@/shared/types/course";
import { format } from "date-fns";

interface CourseDescriptionProps {
  course: Course;
}

export const CourseDescription = ({ course }: CourseDescriptionProps) => {
  const date = format(new Date(course.createdAt), "dd.MM.yyyy");
  const imageSrc = course.imageUrl && course.imageUrl.trim() ? course.imageUrl : "/placeholder.jpeg";

  return (
    <div className="flex gap-4 w-full max-w-2xl">
      <div className="flex justify-between relative w-full max-w-xs min-h-40 rounded-md">
        <Image
          src={imageSrc}
          alt={course?.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="text-md">{course.description}</p>
        <div className="flex gap-8 text-xs text-muted-foreground w-full">
          <p>{course.teacher.email}</p>
          <p className="whitespace-nowrap">Created at: {date}</p>
        </div>
      </div>
    </div>
  );
};
