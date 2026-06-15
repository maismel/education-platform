"use client";

import { useState } from "react";
import Link from "next/link";
import { CreateCourseDialog } from "@/features/courses/components/CreateCourseDialog";
import { CourseCard } from "@/features/courses/components/CourseCard";
import { useAllCourses } from "@/features/courses/api/useAllCourses";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { BackLink } from "@/shared/components/BackLink";
import { useEnroll } from "@/features/enrollments/api/useEnroll";
import { Button } from "@/components/ui/button";
import { useMyEnrollments } from "@/features/enrollments/api/useMyEnrollments";

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
      <BackLink href="/courses" text="Back to my courses" />
      {allCourses && allCourses.length > 0 ? (
        <ul className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 list-none p-0">
          {allCourses.map((course) => {
            const isEnrolled = enrolledCourseIds.has(course.id);

            return (
              <li key={course.id} className="flex justify-center">
                <Link href={`/courses/${course.id}`} className="w-full">
                  <CourseCard
                    title={course.title}
                    description={course.description}
                    imageUrl={course.imageUrl}
                  >
                    {user?.role === "STUDENT" &&
                      (isEnrolled ? (
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
                      ))}
                  </CourseCard>
                </Link>
              </li>
            );
          })}
        </ul>
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
