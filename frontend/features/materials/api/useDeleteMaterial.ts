import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const deleteMaterial = async (materialId: string) => {
  try {
    const response = await api.delete(`/materials/${materialId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete material",
      );
    }

    throw new Error("Unknown error");
  }
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
