import { getAllPosts } from '@/actions/post';
import { currentUser } from '@clerk/nextjs';

const Home = async () => {
    const data = await getAllPosts();
    const user = await currentUser();
    console.log(user)
  return (
    <div>
        {JSON.stringify(data)}
        {JSON.stringify(user)}
    </div>
  )
}

export default Home
