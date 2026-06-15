import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteCourse = async (id: string) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message || "Failed to delete course");
  }
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
