import service from '@/domain/services/service';

async function show(missionary: number) {
    try {
        const response = await service.get(`/api/missionary/${missionary}`);
        return response.data;
    } catch (error) {
        return {};
    }
}

async function index() {
    try {
        const response = await service.get(`/api/missionaries`);
        return response.data;
    } catch (error) {
        return {};
    }
}

async function update(missionary: number, data: Object) {
    try {
        const response = await service.put(`/api/missionaries/${missionary}`, data);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

async function store(data: Object) {
    try {
        const response = await service.post(`/api/missionaries`, data);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

export default {
    show,
    index,
    store,
    update
};