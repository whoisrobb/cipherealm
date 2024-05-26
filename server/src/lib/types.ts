export interface UserRequestBody {
    username: string;
    email: string;
    avatar: string;
}

export type PostSaveProps = {
    creatorId: string;
    content: string | null;
    images?: string[] | null | undefined;
    fileType?: string | null | undefined;
}
