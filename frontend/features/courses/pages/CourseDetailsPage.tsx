"use client";

import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourse } from "@/features/courses/api/useCourse";
import { useCreateLesson } from "@/features/lessons/api/useCreateLesson";
import { useDeleteCourse } from "@/features/courses/api/useDeleteCourse";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackLink } from "@/features/shared/components/BackLink";
import { CourseDescription } from "@/features/courses/components/CourseDescription";
import { LessonsTab } from "@/features/lessons/components/LessonsTab";
import { useState } from "react";
import { EditCourseDialog } from "@/features/courses/components/EditCourseDialog";
import { SubmitDialog } from "@/features/shared/components/SubmitDialog";

interface TeacherDetailPageProps {
  courseId: string;
}

const TABS_OPTIONS = [
  {
    value: "lessons",
    label: "Lessons",
  },
  {
    value: "students",
    label: "Students",
  },
  {
    value: "attendance",
    label: "Attendance",
  },
];

export const CourseDetailsPage = ({ courseId }: TeacherDetailPageProps) => {
  const router = useRouter();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: course, isLoading, error } = useCourse(courseId);
  const { data: currentUser } = useCurrentUser();
  const { mutate: deleteCourse } = useDeleteCourse();

  const handleDeleteCourse = (id: string) => {
    deleteCourse(id);
    router.replace("/courses");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !course) {
    return <div>Course not found</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <BackLink href="/courses" text="Back to courses" />
          {currentUser?.role === "TEACHER" && (
            <div className="flex gap-8">
              <Button
                type="button"
                variant="outline"
                className="flex gap-2"
                onClick={() => setIsEditOpen(true)}
              >
                <PencilIcon />
                <p>Edit Course</p>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex gap-2"
                onClick={() => setIsDeleteOpen(true)}
              >
                <TrashIcon />
                <p>Delete Course</p>
              </Button>
            </div>
          )}
        </div>
        <CourseDescription course={course} />

        <Tabs defaultValue={TABS_OPTIONS[0].value}>
          <TabsList variant="line">
            {TABS_OPTIONS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="lessons">
            <LessonsTab courseId={courseId} />
          </TabsContent>
        </Tabs>
      </div>
      <EditCourseDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Update Course"
        courseId={courseId}
      />
      <SubmitDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Are you sure you want to delete this course?"
        onSubmit={() => handleDeleteCourse(courseId)}
      />
    </>
  );
};
