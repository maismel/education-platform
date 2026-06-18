import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteLesson = async (id: string) => {
 const response = await api.delete(`/lessons/${id}`);
 return response.data;
};

export const useDeleteLesson= () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lessons"],
      });
    },
  });
};
