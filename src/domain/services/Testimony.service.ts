import service from '@/domain/services/service';
import {Testimony} from "@/domain/models/Testimony.ts";

async function show(testimony: number) {
    try {
        const response = await service.get(`/api/testimonies/${testimony}`);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return null;
    }
}

async function index() {
    try {
        const response = await service.get(`/api/testimonies`);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

async function update(testimony: Partial<Testimony>, data: Partial<Testimony>) {
    try {
        const formData = new FormData();
        if(data.imageFile) {
            formData.append('image', data.imageFile);
        }
        formData.append('name', data.name ?? testimony.name ?? '');
        formData.append('content', data.content ?? testimony.content ?? '');

        const response = await service.post(`/api/testimonies/${testimony.id}/edit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

async function store(data: Partial<Testimony>) {
    try {
        const formData = new FormData();
        formData.append('image', data.imageFile ?? '');
        formData.append('name', data.name ?? '');
        formData.append('content', data.content ?? '');
        formData.append('rating', data.rating ?? '5');

        const response = await service.post(`/api/testimonies`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
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