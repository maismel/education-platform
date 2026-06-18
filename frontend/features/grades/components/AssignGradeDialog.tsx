import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAssignGrade } from "@/features/grades/api/useAssignGrade";
import { GradeForm } from "@/features/grades/components/GradeForm";

interface AssignGradeDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  submissionId: string;
}

export const AssignGradeDialog = ({
  isOpen,
  setIsOpen,
  submissionId,
}: AssignGradeDialogProps) => {
  const { mutate: assignGrade } = useAssignGrade();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign a grade</DialogTitle>
          <DialogDescription>You can not edit it later</DialogDescription>
        </DialogHeader>
        <GradeForm
          onSubmit={(data) => {
            assignGrade({
              submissionId,
              score: data.score,
            });
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
