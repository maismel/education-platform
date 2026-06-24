import { api } from "@/api/axios";
import { User } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";

const getCourseStudents = async (courseId: string): Promise<User[]> => {
  const response = await api.get(`/courses/${courseId}/students`);
  return response.data;
};

export const useCourseStudents = (courseId: string) => {
  return useQuery({
    queryKey: ["course-students"],
    queryFn: () => getCourseStudents(courseId),
  });
};
