import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateLesson } from "@/features/lessons/api/useCreateLesson";
import { LessonForm } from "@/features/lessons/components/LessonForm";
import { mergeDateAndTime } from "@/features/lessons/helpers/mergeDateAndTime";

interface CreateLessonDialogProps {
  courseId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
}

export const CreateLessonDialog = ({
  courseId,
  isOpen,
  setIsOpen,
  title,
}: CreateLessonDialogProps) => {
  const { mutateAsync: createLesson } = useCreateLesson();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full sm:max-w-xl!">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Create a new lesson by filling in the title and description below.
            You can always edit these details later in the lesson settings.
          </DialogDescription>
        </DialogHeader>
        <LessonForm
          onSubmit={async (data) => {
            const startsAt = mergeDateAndTime(
              data.startsAtDate,
              data.startsAtTime,
            );
            const endsAt = mergeDateAndTime(data.startsAtDate, data.endsAtTime);

            if (!startsAt || !endsAt) {
              throw new Error("Invalid date");
            }

            await createLesson({
              title: data.title.trim(),
              description: data.description.trim(),
              courseId,
              startsAt: startsAt.toISOString(),
              endsAt: endsAt.toISOString(),
            });

            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
