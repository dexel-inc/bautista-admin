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
    const response = await service.put(`/api/subscriptions/${subscription.id}`, {
        'isEnabled': data.isEnabled ?? subscription.isEnabled,
    });

    return response.data.status.status === 'OK' ? response.data.data : null;
}

async function store(data: Partial<Subscription>) {
    const response = await service.post(`/api/subscriptions`, {
        'email': data.email ?? ''
    });

    return response.data.status.status === 'OK' ? response.data.data : null;
}

async function remove(subscription: number) {
    try {
        const response = await service.delete(`/api/subscriptions/${subscription}`);
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