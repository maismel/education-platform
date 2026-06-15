"use client";
import { useParams } from "next/navigation";
import { useLesson } from "@/features/lessons/api/useLesson";
import { useCourse } from "@/features/courses/api/useCourse";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BackLink } from "@/shared/components/BackLink";
import { LessonDescription } from "@/features/lessons/components/LessonDescription";
import { LessonInfo } from "@/features/lessons/components/LessonInfo";
import { MaterialsSection } from "@/features/materials/components/MaterialsSection";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";

export const LessonDetailPage = () => {
  const params = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const lessonId = params?.lessonId;
  const courseId = params?.courseId;

  const { data: lesson } = useLesson(lessonId ?? "");
  const { data: course } = useCourse(courseId ?? "");

  const { data: user } = useCurrentUser();
  const isTeacher = user?.role === "TEACHER";

  if (!lesson || !course) {
    return;
  }

  return (
    <div className="flex flex-col gap-8">
      <BackLink href={`/courses/${lesson.courseId}`} text="Back to course" />

      <div className="w-full flex gap-10">
        <LessonDescription lesson={lesson} />
        <LessonInfo course={course} lesson={lesson} />
      </div>
      <MaterialsSection lessonId={lesson.id} mode="materials" />
      {!isTeacher && (
        <MaterialsSection lessonId={lesson.id} mode="submissions" />
      )}
      {isTeacher && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student name</TableHead>
              <TableHead>Submission Time</TableHead>
              <TableHead>Files</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      )}
    </div>
  );
};
