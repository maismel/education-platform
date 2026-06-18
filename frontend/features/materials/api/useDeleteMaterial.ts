import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteMaterial = async (materialId: string) => {
 const response = await api.delete(`/materials/${materialId}`);
 return response.data;
};

export const useDeleteMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMaterial,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["materials"],
      });
    },
  });
};
