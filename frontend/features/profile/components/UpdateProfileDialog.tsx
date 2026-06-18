"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { ProfileForm } from "@/features/profile/components/ProfileForm";
import { useUpdateProfile } from "@/features/profile/api/useUpdateProfile";
import { User } from "@/shared/types/user";

interface UpdateProfileDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user?: User;
}

export const UpdateProfileDialog = ({
  isOpen,
  setIsOpen,
  user
}: UpdateProfileDialogProps) => {
  const { mutate: updateProfile } = useUpdateProfile();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Edit your profile information below.
          </DialogDescription>
        </DialogHeader>

        <ProfileForm
          onSubmit={(data, avatar) => {
            updateProfile({
              data,
              avatar,
            });

            setIsOpen(false);
          }}
          defaultValues={{
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            bio: user?.bio ?? "",
          }}
          defaultAvatar={user?.avatarUrl ? `${process.env.NEXT_PUBLIC_API_URL}${user.avatarUrl}` : undefined}
        />
      </DialogContent>
    </Dialog>
  );
};
