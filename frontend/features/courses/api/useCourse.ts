import { api } from "@/api/axios";
import { Course } from "@/features/courses/api/useMyCourses";
import { useQuery } from "@tanstack/react-query";

export const getCourse = async (courseId: string): Promise<Course> => {
  try {
    const { data } = await api.get(`/courses/${courseId}`);
    return data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message || "Failed to fetch course");
  }
};

export const useCourse = (courseId: string) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourse(courseId),
    enabled: !!courseId,
  });
};
