import { UserDetailPage } from "@/features/users/pages/UserDetailPage";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { userId } = await params;
  return (
    <>
      <UserDetailPage userId={userId} />
    </>
  );
}
