import { api } from "@/api/axios";
import { Submission } from "@/shared/types/submission";
import { useQuery } from "@tanstack/react-query";

const getMyLessonSubmissions = async (
  lessonId: string,
): Promise<Submission[]> => {
  const res = await api.get(`/submissions/my/lesson/${lessonId}`);
  return res.data;
};

export const useMyLessonSubmissions = (lessonId: string) => {
  return useQuery({
    queryKey: ["my-submissions", lessonId],
    queryFn: () => getMyLessonSubmissions(lessonId),
    enabled: !!lessonId,
  });
};
