import SignIn from "@/components/sign-in";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/utils/actions";

export default async function Home() {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  if (currentUser) {
    redirect(`/dashboard`);
  }

  return (
    <>
      <div>
        <h2>Please Sign In</h2>
        <SignIn />
      </div>
    </>
  );
}
