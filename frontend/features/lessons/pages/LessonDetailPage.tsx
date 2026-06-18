"use client";
import { useParams } from "next/navigation";
import { useLesson } from "@/features/lessons/api/useLesson";
import { useCourse } from "@/features/courses/api/useCourse";
import { BackLink } from "@/shared/components/BackLink";
import { LessonDescription } from "@/features/lessons/components/LessonDescription";
import { LessonInfo } from "@/features/lessons/components/LessonInfo";
import { MaterialsSection } from "@/features/materials/components/MaterialsSection";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { AssignGradeDialog } from "@/features/grades/components/AssignGradeDialog";
import { useState } from "react";
import { SubmissionsTable } from "@/features/submissions/components/SubmissionsTable";

export const LessonDetailPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const params = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const lessonId = params?.lessonId ?? "";
  const courseId = params?.courseId;

  const { data: user } = useCurrentUser();
  const isTeacher = user?.role === "TEACHER";

  const { data: lesson } = useLesson(lessonId ?? "");
  const { data: course } = useCourse(courseId ?? "");

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
      {isTeacher && <SubmissionsTable setId={setId} setIsOpen={setIsOpen} />}
      <AssignGradeDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        submissionId={id}
      />
    </div>
  );
};
