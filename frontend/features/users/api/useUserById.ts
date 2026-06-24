import { api } from "@/api/axios";
import { User } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";

const getUserById = async (userId: string):Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const useUserById = (userId: string) => {
  return useQuery({
    queryKey: ["user-id"],
    queryFn: () => getUserById(userId),
  });
};
