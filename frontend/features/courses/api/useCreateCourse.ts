import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const createCourse = async (
  title: string,
  description: string,
  imageUrl?: string,
  teacherId?: string 
) => {
  const { data } = await api.post("/courses", {
    title,
    description,
    ...(imageUrl && {
      imageUrl,
    }),
    ...(teacherId && {
      teacherId,
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
      teacherId,
    }: {
      title: string;
      description: string;
      imageUrl?: string;
      teacherId?: string;
    }) => createCourse(title, description, imageUrl, teacherId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-courses"],
      });
      toast.success("You have successfully created a course");
    },
  });
};
