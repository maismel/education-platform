import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      window.location.href = "/auth/login";
    },
  });
};
