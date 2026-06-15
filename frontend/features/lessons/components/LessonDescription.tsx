import { Lesson } from "@/features/lessons/api/useLessons";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";

interface LessonDescriptionProps {
  lesson: Lesson;
}

export const LessonDescription = ({ lesson }: LessonDescriptionProps) => {
  const startDate = format(new Date(lesson?.startsAt), "MMM d");
  const startHour = format(new Date(lesson?.startsAt), "hh:mm");
  const endHour = format(new Date(lesson?.endsAt), "hh:mm");

  return (
    <div className="flex flex-col gap-4 flex-1">
      <h1 className="text-2xl font-bold">{lesson?.title}</h1>
      <p>{lesson?.description}</p>
      <div className="flex gap-8 text-muted-foreground text-sm">
        <div className="flex gap-2">
          <CalendarIcon />
          <p>{startDate}</p>
        </div>
        <div className="flex gap-2">
          <ClockIcon />
          {startHour} - {endHour}
        </div>
      </div>
    </div>
  );
};
