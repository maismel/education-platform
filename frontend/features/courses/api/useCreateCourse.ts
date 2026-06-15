import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createCourse = async (
  title: string,
  description: string,
  imageUrl?: string,
) => {
  try {
    const { data } = await api.post("/courses", {
      title,
      description,
      ...(imageUrl && {
        imageUrl,
      }),
    });

    return data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message || "Failed to create course");
  }
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      description,
      imageUrl,
    }: {
      title: string;
      description: string;
      imageUrl?: string;
    }) => createCourse(title, description, imageUrl),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-courses"],
      });
    },
  });
};
