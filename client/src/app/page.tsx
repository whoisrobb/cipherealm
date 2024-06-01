import { getAllUsers, getUserByEmail } from "@/actions/user-actions";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { User } from "@/lib/types/types";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";


const Home = async () => {
  const data = await getAllUsers();
  const protect = await getUserByEmail('developedbyrobbie@gmail.com')
  console.log("protected data", protect)
  return (
    <>
      <UserButton />
      <ul>
        {data.map((user: User) => (
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