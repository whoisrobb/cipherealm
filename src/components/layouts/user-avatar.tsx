import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from '@clerk/nextjs/server';

const UserAvatar = async () => {
    const user = await currentUser();
  return (
    <Avatar>
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
