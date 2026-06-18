import { api } from "@/api/axios";
import { Submission } from "@/shared/types/submission";
import { useQuery } from "@tanstack/react-query";

const getSubmissions = async (): Promise<Submission[]> => {
  const response = await api.get("/submissions/my");
  return response.data;
};

export const useMySubmissions = () => {
  return useQuery({
    queryKey: ["submissions:my"],
    queryFn: getSubmissions,
  });
};
