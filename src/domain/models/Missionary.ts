export interface Missionary {
    id: number;
    title?: string,
    user?: {
        name?: string;
        email?: string;
    };
    isEnabled?: boolean|null;
    image?: string;
    imageFile?: null|File;
}