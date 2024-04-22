import { Post, User } from "@/db/schema";

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

export type PostData = {
    post: Post;
    user: User;
}