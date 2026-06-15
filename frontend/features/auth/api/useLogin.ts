import { api } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";

type LoginData = {
  email: string;
  password: string;
};

const login = async (data: LoginData) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      window.location.href = "/dashboard";
    },
  });
};
