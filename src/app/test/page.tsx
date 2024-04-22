import { getAllPosts } from '@/actions/post-actions';
import PostInput from '@/components/forms/post-input';
import CreatePost from '@/components/layouts/create-post';
import { generateUUID } from '@/lib/utils/utils';
import { currentUser } from '@clerk/nextjs/server';

const Home = async () => {
    const data = await getAllPosts();
    const currUser = await currentUser();
    const id = currUser?.id;
    // console.log(user)
  return (
    <div className=''>
      <PostInput id={id!} />
        {JSON.stringify(data)}
    </div>
  )
}

export default Home
