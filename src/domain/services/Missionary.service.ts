import service from '@/domain/services/service';
import {Missionary} from "@/domain/models/Missionary.ts";

async function show(missionary: number) {
    try {
        const response = await service.get(`/api/missionaries/${missionary}`);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

async function index() {
    try {
        const response = await service.get(`/api/missionaries`);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

async function update(missionary: Partial<Missionary>, data: Partial<Missionary>) {
    try {
        const formData = new FormData();
        if(data.imageFile) {
            formData.append('image', data.imageFile);
        }
        formData.append('title', data.title ?? missionary.title ?? '');
        formData.append('contact_name', data.user?.name ?? '');
        formData.append('contact_email', data.user?.email ?? '');
        formData.append('isEnabled', data.isEnabled ? 'true' : 'false');

        const response = await service.post(`/api/missionaries/${missionary.id}/edit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

async function store(data: Partial<Missionary>) {
    try {
        const formData = new FormData();
        formData.append('image', data.imageFile ?? '');
        formData.append('title', data.title ?? '');
        formData.append('contact_name', data.user?.name ?? '');
        formData.append('contact_email', data.user?.email ?? '');
        formData.append('isEnabled', data.isEnabled ? 'true' : 'false');

        const response = await service.post(`/api/missionaries`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

async function remove(missionary: number) {
    try {
        const response = await service.delete(`/api/missionaries/${missionary}`);
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