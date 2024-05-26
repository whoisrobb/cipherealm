import React from 'react'
import PostContent from '../layouts/post-content'
import { PostItemProps } from '../layouts/post-item'

const PostReply = ({ post }: PostItemProps) => {
  return (
    <div>
      <PostContent post={post} />
    </div>
  )
}

export default PostReply
