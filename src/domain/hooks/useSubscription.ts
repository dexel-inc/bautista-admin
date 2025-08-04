import { useEffect, useState } from 'react';
import subscriptionServiceMock from '@/domain/services/Subscription.service.mock.ts';
import { Subscription } from '@/domain/models/Subscription.ts';

const service = subscriptionServiceMock;

export function useSubscriptions() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchSubscriptions = async () => {
        setLoading(true);
        const data = await service.index();
        setSubscriptions(data);
        setLoading(false);
    };

    const storeSubscription = async (data: Partial<Subscription>) => {
        setLoading(true);
        const newSubscription = await service.store(data);
        if (newSubscription) setSubscriptions((prev) => [...prev, newSubscription]);
        setLoading(false);
        return newSubscription
    };

    const updateSubscription = async (subscription: Partial<Subscription>, data: Partial<Subscription>) => {
        const updated = await service.update(subscription, data);
        if (updated) {
            setSubscriptions((prev) =>
                prev.map((subscriptionData) => (subscriptionData.id === subscription.id ? updated : subscriptionData))
            );
        }
        return updated;
    };

    const deleteSubscription = async (id: number) => {
        setLoading(true);
        const deleted = await service.remove(id);
        if (deleted) {
            setSubscriptions((prev) =>
                prev.filter((subscription) => (subscription.id !== id))
            );
        }
        setLoading(false);

        return deleted;
    };

    useEffect(() => { fetchSubscriptions(); }, []);

    return {
        subscriptions,
        loading,
        deleteSubscription,
        fetchSubscriptions,
        storeSubscription,
        updateSubscription,
    };
}
