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
        const response = await service.post(`/api/testimonies/${testimony.id}/edit`, {
            'name': data.name ?? testimony.name ?? '',
            'content':  data.content ?? testimony.content ?? '',
        });

        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

async function store(data: Partial<Testimony>) {
    try {
        const response = await service.post(`/api/testimonies`, {
            'name': data.name ?? '',
            'content':  data.content ?? '',
            'rating': data.rating ?? '5',
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