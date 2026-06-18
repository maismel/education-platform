import { api } from "@/api/axios";
import { User } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";

export const getCurrentUser = async ():Promise<User> => {
  const { data } = await api.get("/users/me");
  console.log("data", data);
  return data;
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
};
