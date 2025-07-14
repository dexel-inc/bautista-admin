export interface Missionary {
    id: number;
    description?: string,
    family?: string;
    user?: {
        name?: string;
        email?: string;
    };
    address?: string;
    status?: string;
    img?: string;
}