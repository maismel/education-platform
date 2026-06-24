import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignGrade,
    onSuccess: () => {
      toast.success("You have successfully assigned a grade");
      queryClient.invalidateQueries({ queryKey: ["submissions-lesson"] });
    }
  });
};
