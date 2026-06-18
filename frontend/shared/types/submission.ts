import { Grade } from "@/shared/types/grade";

export interface Submission {
  id: string;
  lessonId: string;
  studentId: string;

  fileName: string | null;
  fileUrl: string | null;
  mimeType: string | null;
  comment: string | null;

  submittedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";

  createdAt: string;
  updatedAt: string;

  lesson: {
    id: string;
    title: string;
  };

  student: {
    id: string;
    email: string;
  };
  grade: Grade;
}
