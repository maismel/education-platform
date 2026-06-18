export interface Teacher {
  id: string;
  email: string;
}

export interface Grade {
  id: string;
  submissionId: string;
  teacherId: string;
  score: number;
  feedback: string | null;
  gradedAt: string;
  createdAt: string;
  updatedAt: string;
  teacher: Teacher;
}
