import {LandingPageClient} from "./client";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic';

const LandingPage = async () => {

  const user = await getCurrent();
  console.log(user, "user in landing page")
  return (
    <LandingPageClient user={user}/>
  )
}

export default LandingPage;