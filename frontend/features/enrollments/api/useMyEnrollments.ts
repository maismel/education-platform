import { api } from "@/api/axios";
import { Course } from "@/shared/types/course";
import { useQuery } from "@tanstack/react-query";

interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  createdAt: string;
  course: Course;
}

const getMyEnrollments = async ():Promise<Enrollment[]> => {
  const response = await api.get("enrollments/my");
  return response.data;
};

export const useMyEnrollments = () => {
  return useQuery({
    queryKey: ["myEnrollments"],
    queryFn: getMyEnrollments,
  });
};
