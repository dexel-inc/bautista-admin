async function login(data: Object) {
    return {
        user: {
            id: 1,
            email: 'user@example.com',
            name: 'John Doe',
            password: 'hashed_password',
        },
        token_type: 'Bearer',
        access_token: 'mock_access_token',
    };
}

async function getUser() {
    return {
        id: 1,
        email: 'user@example.com',
        name: 'John Doe',
        password: 'hashed_password',
    };
}

async function logout() {
    return {
        status: 'OK',
    };
}

export default {
    getUser,
    logout,
    login,
};