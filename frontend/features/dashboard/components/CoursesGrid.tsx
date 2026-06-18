"use client";

import Link from "next/link";
import { CourseCard } from "@/features/courses/components/CourseCard";
import { useMyCourses } from "@/features/courses/api/useMyCourses";
import { useMyEnrollments } from "@/features/enrollments/api/useMyEnrollments";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";

export const CoursesGrid = () => {
  const { data: user } = useCurrentUser();
  const { data: courses } = useMyCourses();
  const { data: myEnrollments } = useMyEnrollments();
  const coursesToShow =
    user?.role === "TEACHER" ? courses : myEnrollments?.map((e) => e.course);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">My Courses</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coursesToShow?.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`}>
            <CourseCard
              variant="compact"
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
