import service from '@/domain/services/service';

async function stats() {
    try {
        const response = await service.post(`/api/visits/stats`);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        return {};
    }
}

export default {
    stats,
};