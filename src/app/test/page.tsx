import { getAllPosts } from '@/actions/post-actions';
import PostInput from '@/components/forms/post-input';
import CreatePost from '@/components/layouts/create-post';
import { currentUser } from '@clerk/nextjs';

const Home = async () => {
    const data = await getAllPosts();
    const user = await currentUser();
    // console.log(user)
  return (
    <div className=''>
      <PostInput />
        {JSON.stringify(data)}
        {/* {JSON.stringify(user)} */}
    </div>
  )
}

export default Home
