import { api } from "@/api/axios";
import { Lesson } from "@/shared/types/lesson";
import { useQuery } from "@tanstack/react-query";

const getLessons = async (courseId: string):Promise<Lesson[]> => {
  try {
    const data = await api.get(`/lessons/course/${courseId}`);
    return data.data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message || "Failed to fetch lessons");
  }
};

export const useLessons = (courseId: string) => {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: () => getLessons(courseId),
  });
};
