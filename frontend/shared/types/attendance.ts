export interface Attendance {
  id: string;
  lessonId: string;
  studentId: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "CHECKED_IN";
  comment: string | null;
  createdAt: string;
}
