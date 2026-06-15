"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";    

import { LessonDayList } from "@/features/calendar/components/LessonDayList";
import { useMyLessons } from "@/features/lessons/api/useMyLessons";

export const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: lessons = [] } = useMyLessons();

  const lessonDates = lessons.map((lesson) => new Date(lesson.startsAt));

  return (
    <div className="flex flex-col gap-10 sm:flex-row ">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          if (date) setSelectedDate(date);
        }}
        modifiers={{
              hasLesson: lessonDates
            }}

            modifiersClassNames={{
              hasLesson:
                "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-indigo-500",
            }}
        className="w-full max-w-sm"
      />

      <LessonDayList selectedDate={selectedDate} lessons={lessons} />
    </div>
  );
};
