"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserCourses } from "@/features/courses/api/useUserCourses";
import { CourseCard } from "@/features/courses/components/CourseCard";

import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { useUserById } from "@/features/users/api/useUserById";
import { format } from "date-fns";
import Link from "next/link";

interface UserDetailPageProps {
  userId: string;
}

export const UserDetailPage = ({ userId }: UserDetailPageProps) => {
  const { data: currentUser } = useCurrentUser();
  const { data: user } = useUserById(userId);

  const { data: courses } = useUserCourses(userId);

  if (!user || !currentUser) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="size-28">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">{fullName}</h1>
            <p className="text-muted-foreground">Role: {user.role}</p>
            <p className="text-muted-foreground ">{user.email}</p>

            <p className="text-sm text-muted-foreground">
              Joined {format(new Date(user.createdAt), "dd.MM.yyyy")}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">About</h2>

          <div className="rounded-xl border p-4 bg-muted/30">
            {user.bio ? (
              <p>{user.bio}</p>
            ) : (
              <p className="text-muted-foreground">No bio provided.</p>
            )}
          </div>
        </div>

        {courses && courses.length > 0 ? (
          <ul className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 list-none p-0">
            {courses.map((course) => (
              <li key={course.id} className="flex justify-center">
                <Link href={`/courses/${course.id}`} className="w-full">
                  <CourseCard
                    title={course.title}
                    description={course.description}
                    imageUrl={course.imageUrl}
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">No courses found.</p>
        )}
      </div>
    </div>
  );
};
