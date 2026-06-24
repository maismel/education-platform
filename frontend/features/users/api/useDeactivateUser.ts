import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deactivateUser = async (userId: string) => {
  const response = await api.patch(`/users/${userId}/deactivate`);
  return response.data;
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users-all"],
      });
    },
  });
};
