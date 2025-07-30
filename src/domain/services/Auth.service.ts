import service from '@/domain/services/service';

async function login(data: Object) {
    try {
        const response = await service.post(`/api/auth/login`, data);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return null;
    }
}

async function getUser() {
    try {
        const response = await service.get(`/api/auth/me`);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

async function logout() {
    try {
        const response = await service.post('/api/auth/logout');
        return response.data.status.status === 'OK' ? response.data : null;
    } catch (error) {
        return null;
    }
}

export default {
    getUser,
    logout,
    login,
};