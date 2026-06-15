import { api } from "@/api/axios";
import { Lesson } from "@/shared/types/lesson";
import { useQuery } from "@tanstack/react-query";

export const useMyLessons = () => {
  return useQuery({
    queryKey: ["my-lessons"],
    queryFn: async ():Promise<Lesson[]> => {
      const res = await api.get("/lessons/my");
      return res.data;
    },
  });
};
