import { api } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";

interface AssignGradeData {
  submissionId: string;
  score: number;
  feedback?: string;
}

const assignGrade = async (data: AssignGradeData) => {
  const response = await api.patch("/grades/assign", data);
  return response.data;
};

export const useAssignGrade = () => {
  return useMutation({
    mutationFn: assignGrade,
  });
};
