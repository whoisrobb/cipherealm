import { saveUser } from "@/actions/user-actions";
import { SignUp, currentUser } from "@clerk/nextjs";
 
export default async function Page() {
  const user = await currentUser();
  await saveUser({
    userId: user?.id!,
    username: user?.username!,
    avatar: user?.imageUrl!,
  })
  return <SignUp />;
}