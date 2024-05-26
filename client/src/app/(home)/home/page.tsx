import { getAllPosts } from '@/actions/post-actions';
import { getUserByUsername } from '@/actions/user-actions';
import PostInput from '@/components/forms/post-input';
import PostItem from '@/components/layouts/post-item';
import { PostData } from '@/lib/types/types';
import { currentUser } from '@clerk/nextjs/server';


const Home = async () => {
  const currUser = await currentUser();
  
  let user = await getUserByUsername(currUser?.username!);
  const postData  = await getAllPosts();

  console.log(user)

  return (
    <div className='space-y-4'>
      <PostInput user={user!} />
      <div className="space-y-2">
        {postData.map((post: PostData) => (
          <PostItem key={post.post.postId} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home
