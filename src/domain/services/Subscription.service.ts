import service from '@/domain/services/service';
import {Subscription} from "@/domain/models/Subscription.ts";


async function index() {
    try {
        const response = await service.get(`/api/subscriptions`);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

async function update(subscription: Partial<Subscription>, data: Partial<Subscription>) {
    const formData = new FormData();
    formData.append('email', data.email ?? subscription.email ?? '');
    formData.append('isEnabled', data.isEnabled ? 'true' : 'false');

    const response = await service.put(`/api/subscriptions/${subscription.id}`, formData);

    return response.data.status.status === 'OK' ? response.data.data : null;
}

async function store(data: Partial<Subscription>) {
    const formData = new FormData();
    formData.append('email', data.email ?? '');
    formData.append('isEnabled', data.isEnabled ? 'true' : 'false');

    const response = await service.post(`/api/subscriptions`, formData);
    return response.data.status.status === 'OK' ? response.data.data : null;
}

async function remove(missionary: number) {
    try {
        const response = await service.delete(`/api/subscriptions/${missionary}`);
        return response.data.status.status === 'OK';
    } catch (error) {
        return {};
    }
}

export default {
    index,
    store,
    update,
    remove
};