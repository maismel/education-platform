"use client";

import { useMyLessons } from "@/features/lessons/api/useMyLessons";
import { isAfter, startOfToday } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

export const UpcomingLessons = () => {
  const { data: lessons = [] } = useMyLessons();

  const upcoming = lessons
    .filter((l) => isAfter(new Date(l.startsAt), startOfToday()))
    .slice(0, 5);

  return (
    <Card>
      <CardContent className="p-5">
        <h2 className="text-lg font-semibold mb-3">Upcoming</h2>

        {upcoming.length === 0 ? (
          <p className="text-muted-foreground">No upcoming lessons</p>
        ) : (
          <div className="flex flex-col gap-3">
            {upcoming.map((lesson) => (
              <div key={lesson.id}>
                <p className="font-medium">{lesson.title}</p>

                <p className="text-sm text-muted-foreground">
                  {new Date(lesson.startsAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
