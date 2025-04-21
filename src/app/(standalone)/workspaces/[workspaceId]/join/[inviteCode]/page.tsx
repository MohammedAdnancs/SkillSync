import { getCurrent } from "@/features/auth/queries";

import { redirect } from "next/navigation";
import { WorkspaceIdJoinClient } from "./client";

export default async function JoinPage() {
    const user = await getCurrent();
    if(!user) redirect(`${process.env.NEXT_PUBLIC_APP_URL}/landingpage`);

    return <WorkspaceIdJoinClient />;
}