import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteLesson = async (id: string) => {
  try {
    const response = await api.delete(`/lessons/${id}`);
    return response.data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message || "Failed to delete lesson");
  }
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
