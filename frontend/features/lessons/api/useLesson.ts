import { api } from "@/api/axios";
import { Lesson } from "@/features/lessons/api/useLessons";
import { useQuery } from "@tanstack/react-query";

const getLesson = async (id: string):Promise<Lesson> => {
  try {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  } catch (e: any) {
    console.error("Create lesson error:", e?.response?.data || e);

    throw new Error(e?.response?.data?.message || "Failed to create lesson");
  }
};

export const useLesson = (id: string) => {
  return useQuery({
    queryKey: ["lesson"],
    queryFn: () => getLesson(id),
    enabled: !!id,
  });
};
