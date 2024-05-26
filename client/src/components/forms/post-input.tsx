"use client";

import React, { useRef, useState } from 'react';
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { postInputSchema } from '@/lib/utils/validators';
import { z } from 'zod';
import { ImageIcon } from '@radix-ui/react-icons';import {
    Dialog,
    DialogTrigger,
 } from "@/components/ui/dialog";
import FileInput from '../helpers/file-input';
import { FileResponse, User } from '@/lib/types/types';
import { createPost } from '@/actions/post-actions';
import UserAvatar from '../layouts/user-avatar';
import { UserButton } from '@clerk/nextjs';
  

type InputType = z.infer<typeof postInputSchema>;
type PostInputProps = {
    user: User[];
}

const PostInput = ({ user }: PostInputProps) => {
    const [fileUrls, setFileUrls] = useState<FileResponse[] | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const form = useForm<InputType>({
        resolver: zodResolver(postInputSchema),
        defaultValues: {
            content: ''
        }
    });

    const addFiles = (files: FileResponse[]) => {
        setFileUrls(files)
    }

    const triggerDialog = (value: boolean) => {
        setDialogOpen(value)
    }

    const onSubmit = async (values: InputType) => {
        const images = fileUrls?.map((file) => (
            file.serverData.fileUrl
        ))
        
        // if (!id) return;

        await createPost({
            creatorId: user[0].userId,
            content: values.content,
            images: images
        })

        setFileUrls(null);
    }

  return (    
    <div className='p-2 gap-2 border flex rounded-md'>
        {/* <UserAvatar avatar={user[0].avatar!} /> */}
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input
                                placeholder="What's on your mind?"
                                {...field}
                                className='rounded-full'
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-between">
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                                <ImageIcon />
                            </Button>
                        </DialogTrigger>
                        <FileInput addFiles={addFiles} triggerDialog={triggerDialog} />
                    </Dialog>
                    <Button variant={"outline"}>Submit</Button>
                    {/* {fileUrls && JSON.stringify(fileUrls)} */}
                </div>
                {/* <Button type="submit">Submit</Button> */}
            </form>
        </Form>
    </div>
  )
}

export default PostInput;