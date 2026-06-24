"use client";
import { Button } from "@/components/ui/button";
import { useAllCourses } from "@/features/courses/api/useAllCourses";
import { CreateCourseDialog } from "@/features/courses/components/CreateCourseDialog";
import { RoleBar } from "@/features/dashboard/components/RoleBar";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { useAllUsers } from "@/features/users/api/useAllUsers";
import { CreateUserDialog } from "@/features/users/components/CreateUserDialog";
import { BookOpen, GraduationCap, Shield, UserPlus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const AdminDashboardPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);

  const { data: courses } = useAllCourses();
  const { data: allUsers } = useAllUsers();
  console.log("courses", courses);
  console.log("allUsers", allUsers);

  const totalUsers = allUsers?.length ?? 0;

  const students = allUsers?.filter((u) => u.role === "STUDENT").length ?? 0;
  const teachers = allUsers?.filter((u) => u.role === "TEACHER");
  const admins = allUsers?.filter((u) => u.role === "ADMIN").length ?? 0;

  const teacherOptions =
    teachers?.map((t) => ({
      value: t.id,
      label: `${t.firstName ?? ""} ${t.lastName ?? ""}`.trim(),
    })) ?? [];

  const totalCourses = courses?.length ?? 0;

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const newUsersThisWeek =
    allUsers?.filter((user) => new Date(user?.createdAt) > weekAgo).length ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>

        <p className="text-muted-foreground mt-2">
          Here is what&lsquos happening on your platform today
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Users"
          value={totalUsers}
          icon={<Users className="size-5" />}
        />

        <StatCard
          title="Students"
          value={students}
          icon={<GraduationCap className="size-5" />}
        />

        <StatCard
          title="Teachers"
          value={teachers?.length ?? 0}
          icon={<UserPlus className="size-5" />}
        />

        <StatCard
          title="Admins"
          value={admins}
          icon={<Shield className="size-5" />}
        />

        <StatCard
          title="Courses"
          value={totalCourses}
          icon={<BookOpen className="size-5" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border p-6 lg:col-span-2">
          <h2 className="font-semibold text-lg mb-4">Recent Users</h2>

          <div className="space-y-4">
            {allUsers?.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {user.firstName} {user.lastName}
                  </p>

                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <span className="rounded-full border px-3 py-1 text-xs">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>

          <div className="flex flex-col gap-3">
            <Button onClick={() => setIsCourseDialogOpen(true)}>Create Course</Button>
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              Create Teacher
            </Button>
            <Button variant="outline" onClick={() => router.push("/users")}>
              Manage Users
            </Button>
          </div>

          <div className="mt-8 rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">New users this week</p>

            <p className="mt-2 text-3xl font-bold">+{newUsersThisWeek}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="font-semibold text-lg mb-4">Latest Courses</h2>

          <div className="space-y-4">
            {courses?.slice(0, 5).map((course) => (
              <div key={course.id}>
                <p className="font-medium">{course.title}</p>

                <p className="text-sm text-muted-foreground line-clamp-1">
                  {course.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="font-semibold text-lg mb-4">Role Distribution</h2>

          <div className="space-y-5">
            <RoleBar label="Students" value={students} total={totalUsers} />

            <RoleBar
              label="Teachers"
              value={teachers?.length ?? 0}
              total={totalUsers}
            />

            <RoleBar label="Admins" value={admins} total={totalUsers} />
          </div>
        </div>
      </div>
      <CreateUserDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <CreateCourseDialog
        isOpen={isCourseDialogOpen}
        setIsOpen={setIsCourseDialogOpen}
        title="Create Course and Assign a teacher"
        teacherOptions={teacherOptions}
      />
    </div>
  );
};
