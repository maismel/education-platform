"use client";

import { format } from "date-fns";
import { Lesson, useLessons } from "@/features/lessons/api/useLessons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrashIcon, EyeIcon, PenIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { UpdateLessonDialog } from "@/features/lessons/components/UpdateLessonDialog";
import { useState } from "react";
import { useDeleteLesson } from "@/features/lessons/api/useDeleteLesson";
import { SubmitDialog } from "@/features/shared/components/SubmitDialog";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";

interface LessonsListProps {
  lessons: Lesson[];
}

export const LessonsList = ({ lessons }: LessonsListProps) => {
  const router = useRouter();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [lessonToDelete, setLessonToDelete] = useState("");
  const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null);
  const { data: user } = useCurrentUser();
  const { mutate: deleteLesson } = useDeleteLesson();

  if (!lessons?.length) return <div>No lessons</div>;

  return (
    <>
      <div className="flex flex-col gap-4">
        <Table className="w-full">
          <TableCaption>A list of lessons on this course.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-xs">Lesson</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Submissions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons?.length > 0 &&
              lessons.map((lesson) => {
                return (
                  <TableRow key={lesson.id}>
                    <TableCell className="wrap-break-word whitespace-normal">
                      {lesson.title}
                    </TableCell>
                    <TableCell className="flex flex-col gap-1">
                      <p>{format(new Date(lesson.startsAt), "dd.MM.yyyy")}</p>
                      <p className="text-muted-foreground">
                        {format(new Date(lesson.startsAt), "HH:mm")} -{" "}
                        {format(new Date(lesson.endsAt), "HH:mm")}
                      </p>
                    </TableCell>
                    <TableCell>{lesson.title}</TableCell>
                    <TableCell className="h-full flex gap-2 justify-start items-center">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          router.push(
                            `/courses/${lesson.courseId}/lessons/${lesson.id}`,
                          );
                        }}
                      >
                        <EyeIcon />
                      </Button>
                      {user?.role === "TEACHER" && (
                        <>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                              setLessonToEdit(lesson);
                              setIsUpdateOpen(true);
                            }}
                          >
                            <PenIcon />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                              setIsDeleteOpen(true);
                              setLessonToDelete(lesson.id);
                            }}
                          >
                            <TrashIcon />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <UpdateLessonDialog
          isOpen={isUpdateOpen}
          setIsOpen={setIsUpdateOpen}
          lesson={lessonToEdit}
          setLesson={setLessonToEdit}
        />
        <SubmitDialog
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          title="Are you sure you want to delete this lesson?"
          onSubmit={() => deleteLesson(lessonToDelete)}
        />
      </div>
    </>
  );
};
