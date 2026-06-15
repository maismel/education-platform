"use client";

import { useMyLessons } from "@/features/lessons/api/useMyLessons";
import { isToday } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export const TodayLessons = () => {
  const { data: lessons = [] } = useMyLessons();

  const todayLessons = lessons.filter((lesson) =>
    isToday(new Date(lesson.startsAt)),
  );

  return (
    <Card>
      <CardContent className="p-5">
        <h2 className="text-lg font-semibold mb-3">Today</h2>

        {todayLessons.length === 0 ? (
          <p className="text-muted-foreground">No lessons today</p>
        ) : (
          <div className="flex flex-col gap-3">
            {todayLessons.map((lesson) => (
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
