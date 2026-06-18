import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createCourse = async (
  title: string,
  description: string,
  imageUrl?: string,
) => {
  const { data } = await api.post("/courses", {
    title,
    description,
    ...(imageUrl && {
      imageUrl,
    }),
  });

  return data;
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
