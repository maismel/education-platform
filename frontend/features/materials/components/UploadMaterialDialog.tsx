import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUploadMaterial } from "@/features/materials/api/useUploadMaterial";
import { MaterialsForm } from "@/features/materials/components/MaterialsForm";
import { useCreateSubmission } from "@/features/submissions/api/useCreateSubmission";

interface UploadMaterialDialogProps {
  lessonId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mode: "materials" | "submissions";
}

export const UploadMaterialDialog = ({
  lessonId,
  isOpen,
  setIsOpen,
  mode,
}: UploadMaterialDialogProps) => {
  const { mutate: uploadMaterial } = useUploadMaterial();
  const { mutate: createSubmission } = useCreateSubmission();

  const handleUpload = async (file: File, comment?: string) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("lessonId", lessonId);

    if (comment) {
      formData.append("comment", comment);
    }

    if (mode === 'submissions') {
      await createSubmission({
        lessonId,
        file,
        comment,
      });
    } else {
      await uploadMaterial({
        lessonId,
        file,
        comment,
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full sm:max-w-xl!">
        <DialogHeader>
          <DialogTitle>Upload Material</DialogTitle>
          <DialogDescription>
            Upload a new material by adding the material below. You can always
            edit these details later in the settings.
          </DialogDescription>
        </DialogHeader>
        <MaterialsForm
          onSubmit={(data) => {
            handleUpload(data.file, data.comment);
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
