import { getAllUsers } from "@/actions/user-actions";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const Home = async () => {
  console.log(await currentUser())
  const data = await getAllUsers();
  return (
    <>
      <UserButton />
      <ul>
        {data.map((user) => (
          <li key={user.userId}>
            <Link href={'/home'}>{user.username}</Link>
          </li>
        ))}
      </ul>
      <ModeToggle />
    </>
  );
}
export default Home;