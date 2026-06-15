import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateCourse } from "@/features/courses/api/useCreateCourse";
import { CourseForm } from "@/features/courses/components/CourseForm";

interface CreateCourseDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
}

export const CreateCourseDialog = ({
  isOpen,
  setIsOpen,
  title,
}: CreateCourseDialogProps) => {
  const { mutate: createCourse } = useCreateCourse();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Create a new course by filling in the title and description below.
            You can always edit these details later in the course settings.
          </DialogDescription>
        </DialogHeader>
        <CourseForm
          onSubmit={(data) => {
            createCourse({
              title: data.title,
              description: data.description,
              imageUrl: data.imageUrl,
            });
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
