import { getAllPosts } from '@/actions/post-actions';
import PostInput from '@/components/forms/post-input';
import PostItem from '@/components/layouts/post-item';
import { currentUser } from '@clerk/nextjs/server';

const Home = async () => {
    const postData = await getAllPosts();
    const currUser = await currentUser();
    const id = currUser?.id;
    // console.log(user)
  return (
    <div className=''>
      <PostInput id={id!} />
      <div className="space-y-2">
        {postData.map((post) => (
          <PostItem key={post.post.postId} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home
