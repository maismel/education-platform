"use client";

import { useLessons } from "@/features/lessons/api/useLessons";
import { CreateLessonDialog } from "@/features/lessons/components/CreateLessonDialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { LessonsList } from "@/features/lessons/components/LessonsList";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";

interface LessonsTabProps {
  courseId: string;
}

export const LessonsTab = ({ courseId }: LessonsTabProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: lessons, isLoading, error } = useLessons(courseId);
  const { data: user } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      <div className="flex flex-col gap-4">
        
        {user?.role === "TEACHER" && (
          <Button
            type="button"
            className="flex gap-2 self-end"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon />
            Create Lesson
          </Button>
        )}

        <LessonsList lessons={lessons || []} />
        <CreateLessonDialog
          courseId={courseId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Create Lesson"
        />
      </div>
    </>
  );
};
