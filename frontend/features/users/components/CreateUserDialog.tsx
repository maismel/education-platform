import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { useCreateTeacher } from "@/features/users/api/useCreateTeacher";
import { toast } from "sonner";

interface CreateUserDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CreateUserDialog = ({
  isOpen,
  setIsOpen,
}: CreateUserDialogProps) => {
  const { mutateAsync: createTeacher } = useCreateTeacher();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an account for Teacher</DialogTitle>
          <DialogDescription>
            Create an account filling the fields below below. You can always
            edit these details later
          </DialogDescription>
        </DialogHeader>
        <SignupForm
          onSubmit={async (data) => {
            await createTeacher(data);
            setIsOpen(false)
            toast.success("Teacher account has been created successfully!");
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
