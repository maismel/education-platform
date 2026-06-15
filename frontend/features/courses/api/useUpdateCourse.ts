import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateCourseData = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

export const updateCourse = async (
  courseId: string,
  courseData: UpdateCourseData,
) => {
  const response = await api.patch(`/courses/${courseId}`, courseData);

  return response.data;
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["course:update"],

    mutationFn: ({
      courseId,
      courseData,
    }: {
      courseId: string;
      courseData: UpdateCourseData;
    }) => updateCourse(courseId, courseData),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["course", variables.courseId],
      });

      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },
  });
};
