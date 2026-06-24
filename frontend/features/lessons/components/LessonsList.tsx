"use client";

import { format } from "date-fns";
import { Lesson } from "@/shared/types/lesson";
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
import { TrashIcon, EyeIcon, PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { UpdateLessonDialog } from "@/features/lessons/components/UpdateLessonDialog";
import { useState } from "react";
import { useDeleteLesson } from "@/features/lessons/api/useDeleteLesson";
import { SubmitDialog } from "@/shared/components/SubmitDialog";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { useCourseAttendance } from "@/features/attendance/api/useCourseAttendance";
import { RoleBar } from "@/features/dashboard/components/RoleBar";
import { useCourseStudents } from "@/features/courses/api/useCourseStudents";
import { useMyAttendance } from "@/features/attendance/api/useMyAttendance";
import { cn } from "@/lib/utils";
import { useLessonAttendanceMap } from "@/features/lessons/hooks/useLessonAttendanceMap";

interface LessonsListProps {
  lessons: Lesson[];
  courseId: string;
}

export const LessonsList = ({ lessons, courseId }: LessonsListProps) => {
  const router = useRouter();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [lessonToDelete, setLessonToDelete] = useState("");
  const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null);

  const { data: user } = useCurrentUser();
  const { data: courseStudents } = useCourseStudents(courseId);
  const { data: courseAttendance } = useCourseAttendance(courseId, user?.role);
  const { data: studentAttendance } = useMyAttendance(user?.role);
  const { mutate: deleteLesson } = useDeleteLesson();

  const { attendanceByLesson, myAttendanceByLesson } = useLessonAttendanceMap({
    courseAttendance,
    studentAttendance,
  });

  const studentAmount = courseStudents?.length ?? 0;

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
              <TableHead>Attendance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons?.length > 0 &&
              lessons.map((lesson) => {
                const status =
                  myAttendanceByLesson?.[lesson.id]?.[0]?.status ?? "ABSENT";
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
                    <TableCell>
                      <div>
                        {user?.role === "STUDENT" ? (
                          <span
                            className={cn(
                              "px-2 py-1 rounded text-xs font-medium",
                              status === "PRESENT" &&
                                "bg-green-100 text-green-700",
                              status === "ABSENT" && "bg-red-100 text-red-700",
                              status === "LATE" &&
                                "bg-yellow-100 text-yellow-700",
                            )}
                          >
                            {status}
                          </span>
                        ) : (
                          <RoleBar
                            value={attendanceByLesson[lesson.id]?.length ?? 0}
                            total={studentAmount}
                            label="Students"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="h-full flex gap-2 justify-start items-center">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          router.push(
                            `/courses/${lesson.courseId}/${lesson.id}`,
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
