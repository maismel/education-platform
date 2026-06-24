"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock3, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Lesson } from "@/shared/types/lesson";

interface LessonCardProps {
  lesson: Lesson;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const router = useRouter();

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-4 w-4" />
            {lesson.title}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock3 className="h-4 w-4" />
            {format(new Date(lesson.startsAt), "HH:mm")} -{" "}
            {format(new Date(lesson.endsAt), "HH:mm")}
          </div>

          <div className="text-sm text-muted-foreground">
            {lesson.course.title}
          </div>
        </div>

        <Button
          className="px-8 self-start"
          onClick={() =>
            router.push(`/courses/${lesson.course.id}/${lesson.id}`)
          }
        >
          Open
        </Button>
      </CardContent>
    </Card>
  );
};
