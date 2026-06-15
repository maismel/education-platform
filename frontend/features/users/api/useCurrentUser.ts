import { api } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

interface User {
    id: string;
    role: string;
    email: string;
}

export const getCurrentUser = async ():Promise<User> => {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch current user",
    );
  }
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
};
