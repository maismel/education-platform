import { api } from "@/api/axios";
import { Submission } from "@/shared/types/submission";
import { useQuery } from "@tanstack/react-query";

const getLessonSubmissions = async (
  lessonId: string,
): Promise<Submission[]> => {
  const response = await api.get(`/submissions/lesson/${lessonId}`);
  return response.data;
};

export const useLessonSubmissions = (lessonId: string) => {
  return useQuery({
    queryKey: ["lesson-submissions", lessonId],
    queryFn: () => getLessonSubmissions(lessonId),
    enabled: !!lessonId,
  });
};
