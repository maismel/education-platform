'use client'

import { useAllUsers } from "@/features/users/api/useAllUsers";
import { UsersTable } from "@/features/users/components/UsersTable";

export const UsersPage = () => {
  const { data: allUsers } = useAllUsers();
  if (!allUsers) return null;

  return <UsersTable users={allUsers} />;
};
