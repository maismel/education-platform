import { api } from "@/api/axios";
import { Course } from "@/shared/types/course";
import { useQuery } from "@tanstack/react-query";

export const getCourse = async (courseId: string): Promise<Course> => {
  const { data } = await api.get(`/courses/${courseId}`);
  return data;
};

export const useCourse = (courseId: string) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourse(courseId),
    enabled: !!courseId,
  });
};
