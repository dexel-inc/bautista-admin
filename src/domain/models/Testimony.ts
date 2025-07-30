export interface Testimony {
    id: number;
    name?: string,
    content?: string;
    image?: string;
    imageFile?: null|File;
    rating?: null|string,
}