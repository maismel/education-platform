import { api } from "@/api/axios";
import { Course } from "@/shared/types/course";
import { useQuery } from "@tanstack/react-query";

export const getMyCourses = async (): Promise<Course[]> => {
  try {
    const { data } = await api.get("/courses/my");
    return data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message || "Failed to fetch my courses");
  }
};

export const useMyCourses = () => {
  return useQuery({
    queryKey: ["my-courses"],
    queryFn: getMyCourses,
  });
};
