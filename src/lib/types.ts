export type FileResponse = {
    key: string;
    name: string;
    serverData: {
        fileUrl: string;
        uploadedBy: string;
    }
}

export type ProductForm = {
    name: string,
    description: string,
    price: string,
    inventory: number,
    tags: string[],
    storeId: string,
    category: string,
    subcategory: string,
    productId: string | undefined,
    images: string[],
}

export type User = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string | null;
    initials: string;
    token: string;
}

export interface ProductsPageProps {
    searchParams: SearchParams
}

export interface SearchParams {
    [key: string]: string | string[] | undefined
}