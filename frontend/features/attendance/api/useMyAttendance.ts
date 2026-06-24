import { api } from "@/api/axios";
import { Attendance } from "@/shared/types/attendance";
import { useQuery } from "@tanstack/react-query";

const getMyAttendance = async (): Promise<Attendance[]> => {
  const response = await api.get("/attendance/my");
  return response.data;
};

export const useMyAttendance = (role?: string) => {
  return useQuery({
    queryKey: ["attendance-my"],
    queryFn: getMyAttendance,
    enabled: !!role && role === "STUDENT",
  });
};
