import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface createTeacherData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio?: string;
}

const createTeacher = async (data: createTeacherData) => {
  const res = await api.post("/users/teachers", data);
  return res.data;
};

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-all"] });
    },
  });
};
