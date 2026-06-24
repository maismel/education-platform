"use client";

import { useState } from "react";
import { CreateCourseDialog } from "@/features/courses/components/CreateCourseDialog";
import { useAllCourses } from "@/features/courses/api/useAllCourses";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { BackLink } from "@/shared/components/BackLink";
import { useEnroll } from "@/features/enrollments/api/useEnroll";
import { Button } from "@/components/ui/button";
import { useMyEnrollments } from "@/features/enrollments/api/useMyEnrollments";
import { CoursesGrid } from "@/features/dashboard/components/CoursesGrid";

export const AllCoursesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useCurrentUser();
  const { data: allCourses } = useAllCourses();
  const { data: myEnrollments } = useMyEnrollments();
  const { mutate: enroll } = useEnroll();

  const enrolledCourseIds = new Set(
    myEnrollments?.map((e) => e.courseId) ?? [],
  );

  return (
    <>
      {user?.role !== "ADMIN" && (
        <BackLink href="/courses" text="Back to my courses" />
      )}
      {allCourses && allCourses.length > 0 ? (
        <div className="mt-4">
          <CoursesGrid
            courses={allCourses}
            renderActions={(course) => {
              const isEnrolled = enrolledCourseIds.has(course.id);

              if (user?.role !== "STUDENT") return null;

              return isEnrolled ? (
                <p className="self-end rounded-full h-10 flex items-center bg-green-100 px-12 py-1 text-sm font-medium text-green-700">
                  Enrolled
                </p>
              ) : (
                <Button
                  className="self-end px-12"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    enroll(course.id);
                  }}
                >
                  Enroll
                </Button>
              );
            }}
          />
        </div>
      ) : (
        <p>No courses found.</p>
      )}
      <CreateCourseDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Create Course"
      />
    </>
  );
};
