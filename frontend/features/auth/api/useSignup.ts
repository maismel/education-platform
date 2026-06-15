import { api } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";

type SignupData = {
  email: string;
  password: string;
};

const signup = async (data: SignupData) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};
