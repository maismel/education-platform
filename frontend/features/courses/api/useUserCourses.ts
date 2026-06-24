import { api } from "@/api/axios";
import { Course } from "@/shared/types/course";
import { useQuery } from "@tanstack/react-query";

const getUserCourses = async (userId: string): Promise<Course[]> => {
  const response = await api.get(`/users/${userId}/courses`);
  return response.data;
};

export const useUserCourses = (userId: string) => {
  return useQuery({
    queryKey: ["user-courses"],
    queryFn: () => getUserCourses(userId),
  });
};
