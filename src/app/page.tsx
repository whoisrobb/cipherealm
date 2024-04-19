import { getAllUsers } from "@/actions/user-actions";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { currentUser } from "@clerk/nextjs";

const Home = async () => {
  // console.log(await currentUser())
  const data = await getAllUsers();
  return (
    <>
      {JSON.stringify(data)}
      <ModeToggle />
    </>
  );
}
export default Home;