import { api } from "@/api/axios";
import { Lesson } from "@/shared/types/lesson";
import { useQuery } from "@tanstack/react-query";

const getLessons = async (courseId: string):Promise<Lesson[]> => {
  const data = await api.get(`/lessons/course/${courseId}`);
  return data.data;
};

export const useLessons = (courseId: string) => {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: () => getLessons(courseId),
  });
};
