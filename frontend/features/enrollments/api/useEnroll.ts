import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const enroll = async (courseId: string) => {
  const response = await api.post(`/enrollments/${courseId}`);
  return response.data;
};

export const useEnroll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["enroll"],

    mutationFn: (courseId: string) => enroll(courseId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-courses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["myEnrollments"],
      });
    },
  });
};
