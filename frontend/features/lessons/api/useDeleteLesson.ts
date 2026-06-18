import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
      toast.success("You have successfully deleted a lesson");
    },
  });
};
