import { api } from "@/api/axios";
import { User } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";

const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get("/users/all");
  return response.data;
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["users-all"],
    queryFn: getAllUsers,
  });
};
