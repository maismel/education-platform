import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteCourse = async (id: string) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-courses"],
      });
    },
  });
};
