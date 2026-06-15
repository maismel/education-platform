"use client";

import { TodayLessons } from "@/features/dashboard/components/TodayLessons";
import { UpcomingLessons } from "@/features/dashboard/components/UpcomingLessons";
import { CoursesGrid } from "@/features/dashboard/components/CoursesGrid";
import { SubmissionsList } from "@/features/dashboard/components/SubmissionsList";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";

export const DashboardPage = () => {
  const { data: user } = useCurrentUser();

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

      <TodayLessons />

      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingLessons />
        <SubmissionsList />
      </div>

      <CoursesGrid />
    </div>
  );
};
