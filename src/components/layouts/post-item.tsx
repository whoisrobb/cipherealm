import { PostData } from '@/lib/types/types';
import React from 'react';
import UserAvatar from './user-avatar';
import { formatDate } from '@/lib/utils/utils';
import { Button } from '../ui/button';
import { BookmarkIcon, ChatBubbleIcon, DotsVerticalIcon, HeartIcon, PaperPlaneIcon, Share1Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import PostContent from './post-content';
import PostReply from '../forms/post-reply';

export type PostItemProps = {
    post: PostData;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className='border p-4 space-y-2 rounded-md'>
        <PostContent post={post} />

        <div className="">
            <Button variant={"ghost"} size={"icon"}>
                <HeartIcon />
            </Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                        <ChatBubbleIcon />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <PostReply post={post} />
                </DialogContent>
            </Dialog>

            <Button variant={"ghost"} size={"icon"}>
                <PaperPlaneIcon />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
                <Share1Icon />
            </Button>
        </div>
    </div>
  )
}

export default PostItem;