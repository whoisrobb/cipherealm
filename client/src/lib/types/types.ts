// import { Post, User } from "@/db/schema";

export type FileResponse = {
    key: string;
    name: string;
    serverData: {
        fileUrl: string;
        uploadedBy: string;
    }
}

export type PostType = {
    creatorId: string;
    content: string | null;
    images?: string[] | null;
    fileType?: string | null;
}

export type Post = {
    postId: string;
    creatorId: string;
    createdAt: Date;
    content: string | null;
    images: string[] | null;
    updatedAt: Date | null;
}

export type User = {
    userId: string;
    username: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
}

export type PostData = {
    post: Post;
    user: User;
}

export type SaveUserProps = {
    username: string;
    email: string;
    avatar: string | null;
}