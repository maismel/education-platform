import { api } from "@/api/axios";
import { Course } from "@/shared/types/course";
import { useQuery } from "@tanstack/react-query";

export const getMyCourses = async (): Promise<Course[]> => {
  const { data } = await api.get("/courses/my");
  return data;
};

export const useMyCourses = () => {
  return useQuery({
    queryKey: ["my-courses"],
    queryFn: getMyCourses,
  });
};
