import { api } from "@/api/axios";
import { Lesson } from "@/shared/types/lesson";
import { useQuery } from "@tanstack/react-query";

const getLesson = async (id: string):Promise<Lesson> => {
   const response = await api.get(`/lessons/${id}`);
   return response.data;
};

export const useLesson = (id: string) => {
  return useQuery({
    queryKey: ["lesson"],
    queryFn: () => getLesson(id),
    enabled: !!id,
  });
};
