"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useCurrentUser } from "@/features/users/api/useCurrentUser";

export const ProfilePage = () => {
  const { data: user } = useCurrentUser();

  if (!user) {
    return null;
  }

  const initials =
    user.email

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      <Card>
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          {/* <Avatar className="h-24 w-24">
            <AvatarImage src={""} />
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar> */}

          <div className="flex flex-1 flex-col gap-2">
            <h2 className="text-2xl font-semibold">{initials}</h2>

            <p className="text-muted-foreground">{user.email}</p>

            {/* <div>
              <Badge>{user.role}</Badge>
            </div> */}
          </div>

          <Button>Edit Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-5 pt-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Role</span>
            <span>{user.role}</span>
          </div>

          {initials && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">First name</span>
              <span>{initials}</span>
            </div>
          )}

          {initials && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last name</span>
              <span>{initials}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
