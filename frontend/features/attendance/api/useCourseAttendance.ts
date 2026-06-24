import { api } from "@/api/axios";
import { Attendance } from "@/shared/types/attendance";
import { useQuery } from "@tanstack/react-query";

const getLessonAttendance = async (courseId: string): Promise<Attendance[]> => {
  const response = await api.get(`/attendance/course/${courseId}`);
  return response.data;
};

export const useCourseAttendance = (courseId: string, role?: string) => {
  return useQuery({
    queryKey: ["lesson-attendance"],
    queryFn: () => getLessonAttendance(courseId),
    enabled: !!courseId && role !== "STUDENT",
  });
};
