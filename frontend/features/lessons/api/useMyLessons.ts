import { api } from "@/api/axios";
import { Lesson } from "@/features/lessons/api/useLessons";
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
