import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateCourse } from "@/features/courses/api/useCreateCourse";
import { CourseForm } from "@/features/courses/components/CourseForm";
import { Option } from "@/shared/components/AppSelect";

interface CreateCourseDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  teacherOptions?: Option[];
}

export const CreateCourseDialog = ({
  isOpen,
  setIsOpen,
  title,
  teacherOptions,
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
              teacherId: data.teacherId,
            });
            setIsOpen(false);
          }}
          teacherOptions={teacherOptions}
        />
      </DialogContent>
    </Dialog>
  );
};
