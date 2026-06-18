"use client";

import { UpcomingLessons } from "@/features/dashboard/components/UpcomingLessons";
import { CoursesGrid } from "@/features/dashboard/components/CoursesGrid";
import { SubmissionsList } from "@/features/dashboard/components/SubmissionsList";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { useMyLessons } from "@/features/lessons/api/useMyLessons";
import { isAfter, isToday, startOfToday } from "date-fns";

export const DashboardPage = () => {
  const { data: user } = useCurrentUser();
  const { data: lessons = [] } = useMyLessons();

  const todayLessons = lessons.filter((lesson) =>
    isToday(new Date(lesson.startsAt)),
  );

  const upcoming = lessons
    .filter((l) => isAfter(new Date(l.startsAt), startOfToday()))
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back!</h1>

        <p className="text-muted-foreground">
          {user?.role === "TEACHER"
            ? "Manage your courses and students"
            : "Keep up with your learning"}
        </p>
      </div>

      <UpcomingLessons lessons={todayLessons} title="Today Lessons" />

      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingLessons lessons={upcoming} title="Upcoming Lessons" />
        <SubmissionsList />
      </div>

      <CoursesGrid />
    </div>
  );
};
