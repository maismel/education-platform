"use client";

import { format, isSameDay } from "date-fns";
import { LessonCard } from "./LessonCard";
import { Lesson } from "@/shared/types/lesson";

interface LessonDayListProps {
  selectedDate: Date;
  lessons: Lesson[];
}

export const LessonDayList = ({
  selectedDate,
  lessons,
}: LessonDayListProps) => {
  const dayLessons = lessons.filter((lesson) =>
    isSameDay(new Date(lesson.startsAt), selectedDate),
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h2 className="text-xl font-semibold">
          {format(selectedDate, "dd MMMM yyyy")}
        </h2>

        <p className="text-muted-foreground">
          {dayLessons.length} lesson
          {dayLessons.length === 1 ? "" : "s"}
        </p>
      </div>

      {dayLessons.length === 0 ? (
        <div className="text-muted-foreground">No lessons scheduled.</div>
      ) : (
        dayLessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))
      )}
    </div>
  );
};
