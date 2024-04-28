import React from 'react'
import UserAvatar from './user-avatar'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/utils'
import { Button } from '../ui/button'
import { BookmarkIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { PostItemProps } from './post-item'

const PostContent = ({ post }: PostItemProps) => {
    return (
      <div>
          <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                  <UserAvatar avatar={post.user.avatar!} />
                  <div className="leading-tight">
                      <Link href={'#'} className="">{post.user.username}</Link>
                      <p className="text-muted-foreground text-[.75rem]">{formatDate(post.user.createdAt)}</p>
                  </div>
              </div>
              <div className="">
                  <Button variant={"ghost"} size={"icon"} className='justify-self-end'>
                      <BookmarkIcon />
                  </Button>
                  <Button variant={"ghost"} size={"icon"} className='justify-self-end'>
                      <DotsVerticalIcon />
                  </Button>
              </div>
          </div>
          <div className="">
              <p className="">{post.post.content}</p>
          </div>
      </div>
    )
  }
  
export default PostContent
