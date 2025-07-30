export interface AuthUser {
    user: {
        id?: number;
        email?: string,
        name?: string;
        password?: string;
    }
    token_type?: string,
    access_token?: string
}