import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface UpdateProfileDto {
  firstName: string;
  lastName: string;
  bio?: string;
}

interface UpdateProfilePayload {
  data: UpdateProfileDto;
  avatar?: File;
}

const updateProfile = async ({ data, avatar }: UpdateProfilePayload) => {
  const formData = new FormData();

  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);

  if (data.bio) {
    formData.append("bio", data.bio);
  }

  if (avatar) {
    formData.append("avatar", avatar);
  }

  const res = await api.patch("/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
      toast.success("You have successfully updated your profile");
    },
  });
};
