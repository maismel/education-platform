import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateLesson {
  title: string;
  description: string;
  courseId: string;
  startsAt: string;
  endsAt: string;
}

const createLesson = async (data: CreateLesson) => {
  try {
    const response = await api.post("/lessons", data);
    return response.data;
  } catch (error: any) {
    console.error("Create lesson error:", error?.response?.data || error);

    throw new Error(
      error?.response?.data?.message || "Failed to create lesson",
    );
  }
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lessons"],
      });
    },
  });
};
