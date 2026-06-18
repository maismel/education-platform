import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateLesson {
  title: string;
  description: string;
  courseId: string;
  startsAt: string;
  endsAt: string;
}

const createLesson = async (data: CreateLesson) => {
  const response = await api.post("/lessons", data);
  return response.data;
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lessons"],
      });
    },
  });
};
