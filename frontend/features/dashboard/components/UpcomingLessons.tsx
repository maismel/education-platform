"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Lesson } from "@/shared/types/lesson";

interface UpcomingLessonsProps {
  lessons: Lesson[];
  title: string;
}

export const UpcomingLessons = ({ lessons, title }: UpcomingLessonsProps) => {
  return (
    <Card>
      <CardContent className="p-5">
        <h2 className="text-lg font-semibold mb-3">{title}</h2>

        {lessons.length === 0 ? (
          <p className="text-muted-foreground">No lessons</p>
        ) : (
          <div className="flex flex-col gap-3">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{lesson.title}</p>

                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(lesson.startsAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <span className="text-xs text-muted-foreground">
                  {lesson.course.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
