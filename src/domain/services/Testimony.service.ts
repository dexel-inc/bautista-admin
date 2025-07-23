import service from '@/domain/services/service';

async function show(testimony: number) {
    try {
        const response = await service.get(`/api/testimony/${testimony}`);
        return response.data;
    } catch (error) {
        return {};
    }
}

async function index() {
    try {
        const response = await service.get(`/api/testimonies`);
        return response.data;
    } catch (error) {
        return {};
    }
}

async function update(testimony: number, data: Object) {
    try {
        const response = await service.put(`/api/testimonies/${testimony}`, data);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

async function store(data: Object) {
    try {
        const response = await service.post(`/api/testimonies`, data);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

async function remove(testimony: number) {
    try {
        const response = await service.delete(`/api/testimonies/${testimony}`);
        return response.data.status.status === 'OK';
    } catch (error) {
        return {};
    }
}

export default {
    show,
    index,
    store,
    update,
    remove
};