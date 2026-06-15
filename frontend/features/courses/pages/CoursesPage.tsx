"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateCourseDialog } from "@/features/courses/components/CreateCourseDialog";
import { useMyCourses } from "@/features/courses/api/useMyCourses";
import { CourseCard } from "@/features/courses/components/CourseCard";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { useRouter } from "next/navigation";
import { useMyEnrollments } from "@/features/enrollments/api/useMyEnrollments";

export const CoursesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const { data: user } = useCurrentUser();
  const { data: courses } = useMyCourses();
  const { data: myEnrollments } = useMyEnrollments();
  const coursesToShow = user?.role === 'TEACHER' ? courses : myEnrollments?.map(e => e.course)

  return (
    <>
      <div className="flex justify-end gap-4">
        {user?.role !== "STUDENT" && (
          <Button
            className="flex gap-2"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon />
            Create Course
          </Button>
        )}
        <Button
          variant="outline"
          className="flex gap-2"
          onClick={() => router.push('/courses/all')}
        >
          <EyeIcon />
          View All Courses
        </Button>
      </div>
      {coursesToShow && coursesToShow.length > 0 ? (
        <ul className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 list-none p-0">
          {coursesToShow.map((course) => (
            <li key={course.id} className="flex justify-center">
              <Link href={`/courses/${course.id}`} className="w-full">
                <CourseCard
                  title={course.title}
                  description={course.description}
                  imageUrl={course.imageUrl}
                />
              </Link>
            </li>
          ))}
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
