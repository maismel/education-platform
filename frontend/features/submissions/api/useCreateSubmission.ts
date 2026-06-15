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

  const response = await api.post("/submissions/upload", formData);

  return response.data;
};

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadMaterial,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["submissions"],
      });
    },
  });
};
