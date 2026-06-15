import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lesson } from "@/features/lessons/api/useLessons";
import { useUpdateLesson } from "@/features/lessons/api/useUpdateLesson";
import { LessonForm } from "@/features/lessons/components/LessonForm";
import { lessonToFormValues } from "@/features/lessons/helpers/lessonToFormValues";
import { mergeDateAndTime } from "@/features/lessons/helpers/mergeDateAndTime";

interface UpdateLessonDialogProps {
  lesson: Lesson | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setLesson: (lesson: Lesson | null) => void
}

export const UpdateLessonDialog = ({
  lesson,
  isOpen,
  setIsOpen,
  setLesson,
}: UpdateLessonDialogProps) => {
  const { mutate: updateLesson } = useUpdateLesson();
  if (!lesson) return;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full sm:max-w-xl!">
        <DialogHeader>
          <DialogTitle>Update Lesson</DialogTitle>
          <DialogDescription>
            Edit a lesson by filling in the title and description below. You can
            always edit these details later.
          </DialogDescription>
        </DialogHeader>
        <LessonForm
          defaultValues={lessonToFormValues(lesson)}
          onSubmit={async (data) => {
            const startsAt = mergeDateAndTime(
              data.startsAtDate,
              data.startsAtTime,
            );
            const endsAt = mergeDateAndTime(data.startsAtDate, data.endsAtTime);

            if (!startsAt || !endsAt) {
              throw new Error("Invalid date");
            }

            await updateLesson({
              lessonId: lesson.id,
              lessonData: {
                title: data.title.trim(),
                description: data.description.trim(),
                startsAt: startsAt.toISOString(),
                endsAt: endsAt.toISOString(),
              },
            });

            setLesson(null);
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
