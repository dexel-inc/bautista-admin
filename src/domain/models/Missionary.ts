export interface Missionary {
    id: number;
    title?: string,
    message?: string;
    status?: string|null;
    user?: {
        name?: string;
        email?: string;
    };
    disabled_at?: string|null;
    image?: string;
    imageFile?: null|File;
}