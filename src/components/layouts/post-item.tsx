import { PostData } from '@/lib/types/types';
import React from 'react';
import UserAvatar from './user-avatar';
import { formatDate } from '@/lib/utils/utils';
import { Button } from '../ui/button';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

type PostItemProps = {
    post: PostData;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className='border p-4 space-y-2 rounded-md'>
        <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <UserAvatar avatar={post.user.avatar!} />
                <div className="leading-tight">
                    <Link href={'#'} className="">{post.user.username}</Link>
                    <p className="text-muted-foreground text-[.75rem]">{formatDate(post.user.createdAt)}</p>
                </div>
            </div>
            <Button variant={"ghost"} size={"icon"} className='justify-self-end'><DotsVerticalIcon /></Button>
        </div>
        <div className="">
            <p className="">{post.post.content}</p>
        </div>
    </div>
  )
}

export default PostItem;