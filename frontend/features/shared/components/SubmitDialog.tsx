import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SubmitDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  onSubmit: () => void;
}

export const SubmitDialog = ({
  isOpen,
  setIsOpen,
  title,
  onSubmit,
}: SubmitDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full sm:max-w-md!">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Please confirm that you want to continue. This action will be
            applied immediately.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="px-12"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="lg"
            className="px-12"
            onClick={() => {
              setIsOpen(false);
              onSubmit();
            }}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
