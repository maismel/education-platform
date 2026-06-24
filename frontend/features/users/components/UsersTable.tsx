"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { useDeactivateUser } from "@/features/users/api/useDeactivateUser";
import { SubmitDialog } from "@/shared/components/SubmitDialog";
import { User } from "@/shared/types/user";
import { EyeIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UsersTableProps {
  users: User[];
}

export const UsersTable = ({users}: UsersTableProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState("");

  const router = useRouter();

  const { data: currentUser } = useCurrentUser();
  const { mutateAsync: deactivateUser } = useDeactivateUser();

  return (
    <>
      <Table>
        <TableCaption>A list of lessons on this course.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Avatar</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.length > 0 &&
            users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell className="flex">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`${API_URL}${user.avatarUrl}`} />
                      <AvatarFallback className="text-xl overflow-hidden">
                        {user.firstName}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="wrap-break-word whitespace-normal">
                    {user.firstName + " " + user.lastName}
                  </TableCell>
                  <TableCell className="">{user.email}</TableCell>
                  <TableCell className="">{user.role}</TableCell>
                  <TableCell className="flex gap-2 justify-start items-start">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        router.push(`/users/${user.id}`);
                      }}
                    >
                      <EyeIcon />
                    </Button>
                    {currentUser?.role === "ADMIN" && (
                      <>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            setIsDeleteOpen(true);
                            setUserToDelete(user.id);
                          }}
                        >
                          <TrashIcon />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <SubmitDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Are you sure you want to deactivate this user"
        onSubmit={() => deactivateUser(userToDelete)}
      />
    </>
  );
};
