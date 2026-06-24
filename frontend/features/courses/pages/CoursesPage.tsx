"use client";

import { useEffect, useState } from "react";
import { PlusIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateCourseDialog } from "@/features/courses/components/CreateCourseDialog";
import { useMyCourses } from "@/features/courses/api/useMyCourses";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { useRouter } from "next/navigation";
import { useMyEnrollments } from "@/features/enrollments/api/useMyEnrollments";
import { CoursesGrid } from "@/features/dashboard/components/CoursesGrid";

export const CoursesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const { data: user } = useCurrentUser();
  const { data: courses } = useMyCourses();
  const { data: myEnrollments } = useMyEnrollments();
  const coursesToShow =
    user?.role === "TEACHER" ? courses : myEnrollments?.map((e) => e.course);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      router.replace("/courses/all");
    }
  }, [user, router]);

  return (
    <>
      <div className="flex justify-end gap-4">
        {user?.role !== "STUDENT" && (
          <Button className="flex gap-2" onClick={() => setIsOpen(true)}>
            <PlusIcon />
            Create Course
          </Button>
        )}
        <Button
          variant="outline"
          className="flex gap-2"
          onClick={() => router.push("/courses/all")}
        >
          <EyeIcon />
          View All Courses
        </Button>
      </div>
      {coursesToShow && coursesToShow.length > 0 ? (
        <CoursesGrid courses={coursesToShow} />
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
