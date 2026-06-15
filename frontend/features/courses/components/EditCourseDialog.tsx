import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCourse } from "@/features/courses/api/useCourse";
import { useUpdateCourse } from "@/features/courses/api/useUpdateCourse";
import { CourseForm } from "@/features/courses/components/CourseForm";

interface EditCourseDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  courseId: string;
}

export const EditCourseDialog = ({
  isOpen,
  setIsOpen,
  title,
  courseId,
}: EditCourseDialogProps) => {
  const { data: course } = useCourse(courseId);
  const { mutateAsync: updateCourse } = useUpdateCourse();
  if (!course) {
    return;
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Update a course by filling in the title, description and image url
            below. You can always edit these details later in the course
            settings.
          </DialogDescription>
        </DialogHeader>
        <CourseForm
          defaultValues={{
            title: course.title,
            description: course.description,
            imageUrl: course.imageUrl ?? "",
          }}
          onSubmit={(data) => {
            updateCourse({
              courseId: course.id,
              courseData: {
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
              },
            });
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
