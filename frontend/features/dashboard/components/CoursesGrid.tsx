"use client";

import Link from "next/link";
import { CourseCard } from "@/features/courses/components/CourseCard";
import { Course } from "@/shared/types/course";

interface CoursesGridProps {
  courses: Course[];
  variant?: "default" | "compact";
  renderActions?: (course: Course) => React.ReactNode;
}

export const CoursesGrid = ({
  courses,
  variant = "default",
  renderActions,
}: CoursesGridProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">My Courses</h2>

      <ul className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 list-none p-0">
        {courses?.map((course) => (
          <li key={course.id}>
            <Link href={`/courses/${course.id}`}>
              <CourseCard
                variant={variant}
                title={course.title}
                description={course.description}
                imageUrl={course.imageUrl}
              >
                {renderActions?.(course)}
              </CourseCard>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
