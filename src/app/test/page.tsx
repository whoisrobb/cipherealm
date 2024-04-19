import { getAllPosts } from '@/actions/post-actions';
import PostInput from '@/components/forms/post-input';
import CreatePost from '@/components/layouts/create-post';
import { generateUUID } from '@/lib/utils/utils';
import { currentUser } from '@clerk/nextjs/server';

const Home = async () => {
    const data = await getAllPosts();
    const id = generateUUID();
    // console.log(user)
  return (
    <div className=''>
      <PostInput />
        {JSON.stringify(data)}
        {JSON.stringify(id)}
    </div>
  )
}

export default Home
