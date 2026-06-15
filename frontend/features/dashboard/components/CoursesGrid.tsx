"use client";

import Link from "next/link";
import { CourseCard } from "@/features/courses/components/CourseCard";
import { useMyCourses } from "@/features/courses/api/useMyCourses";

export const CoursesGrid = () => {
  const { data: courses = [] } = useMyCourses();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Courses</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
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
