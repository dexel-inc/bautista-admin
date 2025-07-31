import api from '@/domain/config/api';

export default {
    app_name: 'Iglesia Bautista Fundamental',
    onTest: import.meta.env.VITE_USE_MOCK === 'true',
    api,
};