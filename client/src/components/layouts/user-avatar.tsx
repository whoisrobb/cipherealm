import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from '@clerk/nextjs/server';

const UserAvatar = async ({ avatar }: { avatar: string }) => {
    const user = await currentUser();
  return (
    <Avatar>
        <AvatarImage src={avatar!} />
        <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
