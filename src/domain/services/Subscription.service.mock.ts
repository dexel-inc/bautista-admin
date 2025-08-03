import { Subscription } from "@/domain/models/Subscription";
import subscriptionsData from "@/domain/mocks/subscriptions.ts";

const STORAGE_KEY = "mock_subscriptions";

function getStoredSubscriptions(): Subscription[] {
    let data = localStorage.getItem(STORAGE_KEY);

    if(!data) {
        data = JSON.stringify(subscriptionsData);

        localStorage.setItem(STORAGE_KEY, data);
    }

    return data ? JSON.parse(data) : [];
}

function saveSubscriptions(subscriptions: Subscription[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
}

async function index(): Promise<Subscription[]> {
    return getStoredSubscriptions();
}

async function show(id: number): Promise<Subscription | undefined> {
    const subscriptions = getStoredSubscriptions();
    return subscriptions.find((s) => s.id === id);
}

async function store(data: Subscription): Promise<Subscription> {
    const subscriptions = getStoredSubscriptions();
    const newSubscription: Subscription = {
        ...data,
        id: subscriptions.length + 1,
    };
    subscriptions.push(newSubscription);
    saveSubscriptions(subscriptions);
    return newSubscription;
}

async function update(subscription: Partial<Subscription>, data: Partial<Subscription>): Promise<Subscription | null> {
    const subscriptions = getStoredSubscriptions();
    const index = subscriptions.findIndex((s) => s.id === subscription.id);

    if (index === -1) return null;

    const updated = { ...subscriptions[index], ...data };
    subscriptions[index] = updated;
    saveSubscriptions(subscriptions);

    return updated;
}

async function remove(id: number): Promise<boolean> {
    const subscriptions = getStoredSubscriptions();
    const index = subscriptions.findIndex((m) => m.id === id);

    if (index === -1) return false;

    saveSubscriptions(subscriptions.filter((subscription) => subscription.id !== id));

    return true;
}

export default {
    index,
    show,
    store,
    update,
    remove,
};
