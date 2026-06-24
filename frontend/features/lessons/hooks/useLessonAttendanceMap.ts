import { Attendance } from "@/shared/types/attendance";
import { useMemo } from "react";

export const useLessonAttendanceMap = ({
  courseAttendance,
  studentAttendance,
}: {
  courseAttendance?: Attendance[];
  studentAttendance?: Attendance[];
}) => {
  const attendanceByLesson = useMemo(() => {
    return Object.groupBy(courseAttendance ?? [], (a) => a.lessonId);
  }, [courseAttendance]);

  const myAttendanceByLesson = useMemo(() => {
    return Object.groupBy(studentAttendance ?? [], (a) => a.lessonId);
  }, [studentAttendance]);

  return {
    attendanceByLesson,
    myAttendanceByLesson,
  };
};
