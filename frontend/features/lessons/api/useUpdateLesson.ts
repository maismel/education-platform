import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type UpdateLessonData = {
  title?: string;
  description?: string;
  startsAt?: string;
  endsAt?: string;
};

export const updateLesson = async (
  lessonId: string,
  lessonData: UpdateLessonData,
) => {
  const response = await api.patch(`/lessons/${lessonId}`, lessonData);
  return response.data;
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["lesson:update"],

    mutationFn: ({
      lessonId,
      lessonData,
    }: {
      lessonId: string;
      lessonData: UpdateLessonData;
    }) => updateLesson(lessonId, lessonData),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["lessons", variables.lessonId],
      });

      queryClient.invalidateQueries({
        queryKey: ["lessons"],
      });
      toast.success("You have successfully updated a lesson");
    },
  });
};
