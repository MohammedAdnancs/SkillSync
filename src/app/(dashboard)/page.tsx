import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

const DashboardPage = async () => {
  
  const user = await getCurrent();
  if (!user) redirect(`${process.env.NEXT_PUBLIC_APP_URL}/landingpage`)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="mb-6">Loading your workspaces...</p>
    </div>
  );
}

export default DashboardPage;