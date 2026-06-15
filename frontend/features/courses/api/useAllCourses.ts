import { api } from "@/api/axios";
import { Course } from "@/shared/types/course";
import { useQuery } from "@tanstack/react-query";

const getAllCourses = async (): Promise<Course[]> => {
  const response = await api.get("/courses");
  return response.data;
};

export const useAllCourses = () => {
  return useQuery({
    queryKey: ["allCourses"],
    queryFn: getAllCourses,
  });
};
