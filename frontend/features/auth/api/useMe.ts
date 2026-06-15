import { api } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
