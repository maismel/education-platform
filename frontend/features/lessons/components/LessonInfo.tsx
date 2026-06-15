import { Course } from "@/features/courses/api/useMyCourses";
import { Lesson } from "@/features/lessons/api/useLessons";
import { differenceInMinutes } from "date-fns";

interface LessonInfoProps {
  course: Course;
  lesson: Lesson;
}

export const LessonInfo = ({ course, lesson }: LessonInfoProps) => {
  const durationInMinutes = differenceInMinutes(
    new Date(lesson.endsAt),
    new Date(lesson.startsAt),
  );
  
  return (
    <div className="flex flex-col gap-4 flex-1 border rounded-md p-4 shadow-md">
      <p className="text-xl font-bold">Lesson Details</p>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">Course</p>
        <p>{course?.title}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">Teacher</p>
        <p>{course?.teacher.email}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">Duration</p>
        <p>{durationInMinutes} min</p>
      </div>
    </div>
  );
};
