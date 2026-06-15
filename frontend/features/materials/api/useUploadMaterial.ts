import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UploadMaterialData = {
  lessonId: string;
  file: File;
  comment?: string;
};

const uploadMaterial = async ({
  lessonId,
  file,
  comment,
}: UploadMaterialData) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("lessonId", lessonId);

  if (comment) {
    formData.append("comment", comment);
  }

  const response = await api.post("/materials/upload", formData);

  return response.data;
};

export const useUploadMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadMaterial,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["materials", variables.lessonId],
      });
    },
  });
};
