import { useEffect, useState } from 'react';
import subscriptionService from '@/domain/services/Subscription.service.ts';
import subscriptionServiceMock from '@/domain/services/Subscription.service.mock.ts';
import { Subscription } from '@/domain/models/Subscription.ts';
import config from "@/domain/config";

const service = config.onTest ? subscriptionServiceMock : subscriptionService;

export function useSubscriptions() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchSubscriptions = async () => {
        setLoading(true);
        const data = await service.index();
        setSubscriptions(data);
        setLoading(false);
    };

    const addSubscription = async (data: Partial<Subscription>) => {
        setLoading(true);
        try {
            const newSubscription = await service.store(data);
            if (newSubscription) setSubscriptions((prev) => [...prev, newSubscription]);
            setLoading(false);
            return newSubscription
        } catch (error) {throw new Error("No se pudo crear. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const updateSubscription = async (subscription: Partial<Subscription>, data: Partial<Subscription>) => {
        setLoading(true);
        try {
            const updated = await service.update(subscription, data);
            if (updated) {
                setSubscriptions((prev) =>
                    prev.map((subscriptionData) => (subscriptionData.id === subscription.id ? updated : subscriptionData))
                );
            }
            setLoading(false);

            return updated;
        } catch (error) {throw new Error("No se pudo actualizar. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }

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

    const storeOrUpdateSubscription = async (data: Partial<Subscription>|Subscription, subscription?: Partial<Subscription>|null) => {
        if(subscription) {
            return await updateSubscription(subscription, data);
        }

        return await addSubscription(data);
    }

    useEffect(() => { fetchSubscriptions(); }, []);

    return {
        subscriptions,
        loading,
        deleteSubscription,
        fetchSubscriptions,
        addSubscription,
        updateSubscription,
        storeOrUpdateSubscription
    };
}
