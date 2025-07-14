import { Missionary } from "@/domain/models/Missionary";
import missionariesData from "@/domain/mocks/missionaries.ts";

const STORAGE_KEY = "mock_missionaries";

function getStoredMissionaries(): Missionary[] {
    let data = localStorage.getItem(STORAGE_KEY);

    if(!data) {
        data = JSON.stringify(missionariesData);

        localStorage.setItem(STORAGE_KEY, data);
    }

    return data ? JSON.parse(data) : [];
}

function saveMissionaries(missionaries: Missionary[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(missionaries));
}

async function index(): Promise<Missionary[]> {
    return getStoredMissionaries();
}

async function show(id: number): Promise<Missionary | undefined> {
    const missionaries = getStoredMissionaries();
    return missionaries.find((m) => m.id === id);
}

async function store(data: Partial<Missionary>): Promise<Missionary> {
    const missionaries = getStoredMissionaries();
    const newMissionary: Missionary = {
        ...data,
        id: missionaries.length + 1,
    };
    missionaries.push(newMissionary);
    saveMissionaries(missionaries);
    return newMissionary;
}

async function update(id: number, data: Partial<Missionary>): Promise<Missionary | null> {
    const missionaries = getStoredMissionaries();
    const index = missionaries.findIndex((m) => m.id === id);

    if (index === -1) return null;

    const updated = { ...missionaries[index], ...data };
    missionaries[index] = updated;
    saveMissionaries(missionaries);

    return updated;
}

export default {
    index,
    show,
    store,
    update,
};
