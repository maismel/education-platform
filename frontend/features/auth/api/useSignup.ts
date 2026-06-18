import { api } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio?: string;
}

const signup = async (data: SignupData) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};
