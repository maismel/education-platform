import { api } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
  teacher: {
    id: string;
    email: string;
  };
}

export const getMyCourses = async (): Promise<Course[]> => {
  try {
    const { data } = await api.get("/courses/my");
    return data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message || "Failed to fetch my courses");
  }
};

export const useMyCourses = () => {
  return useQuery({
    queryKey: ["my-courses"],
    queryFn: getMyCourses,
  });
};
