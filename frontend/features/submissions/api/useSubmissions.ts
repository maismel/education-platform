import { api } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

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
}

const getSubmissions = async ():Promise<Submission[]> => {
  const response = await api.get("/submissions");
  return response.data;
};

export const useSubmissions = () => {
  return useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
  });
};
