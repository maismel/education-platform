import { api } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export type Material = {
  id: string;
  lessonId: string;
  uploadedById: string;
  fileName: string | null;
  fileUrl: string | null;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
  comment?: string | null;
};

export const getLessonMaterials = async (
  lessonId: string,
): Promise<Material[]> => {
  const response = await api.get(`/materials/lesson/${lessonId}`);
  return response.data;
};

export const useGetLessonMaterials = (lessonId: string) => {
  return useQuery({
    queryKey: ["materials", lessonId],
    queryFn: () => getLessonMaterials(lessonId),
    enabled: !!lessonId,
  });
};
