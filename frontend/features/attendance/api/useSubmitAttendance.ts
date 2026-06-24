import { api } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const submitAttendance = async (lessonId: string) => {
  await api.post(`/attendance/check-in/${lessonId}`);
};

export const useSubmitAttendance = () => {
  return useMutation({
    mutationFn: submitAttendance,
    onSuccess: () => {
      toast.success("You have successfully submitted your attendance");
    },
  });
};
