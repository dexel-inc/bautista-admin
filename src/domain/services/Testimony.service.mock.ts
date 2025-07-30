import { Testimony } from "@/domain/models/Testimony";
import testimoniesData from "@/domain/mocks/testimonies.ts";

const STORAGE_KEY = "mock_testimonies";

function getStoredTestimonies(): Partial<Testimony>[] {
    let data = localStorage.getItem(STORAGE_KEY);

    if(!data) {
        data = JSON.stringify(testimoniesData);

        localStorage.setItem(STORAGE_KEY, data);
    }

    return data ? JSON.parse(data) : [];
}

function saveTestimonies(testimonies: Partial<Testimony>[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonies));
}

async function index(): Promise<Partial<Testimony>[]> {
    return getStoredTestimonies();
}

async function show(id: number): Promise<Partial<Testimony> | undefined> {
    const testimonies = getStoredTestimonies();
    return testimonies.find((m) => m.id === id);
}

async function store(data: Partial<Testimony>): Promise<Partial<Testimony>> {
    const testimonies = getStoredTestimonies();
    const newTestimony: Partial<Testimony> = {
        ...data,
        id: testimonies.length + 1,
    };
    testimonies.push(newTestimony);
    saveTestimonies(testimonies);
    return newTestimony;
}

async function update(testimony: Partial<Testimony>, data: Partial<Testimony>): Promise<Partial<Testimony> | null> {
    const testimonies = getStoredTestimonies();
    const index = testimonies.findIndex((m) => m.id === testimony.id);

    if (index === -1) return null;

    const updated = { ...testimonies[index], ...data };
    testimonies[index] = updated;
    saveTestimonies(testimonies);

    return updated;
}

async function remove(id: number): Promise<boolean> {
    const testimonies = getStoredTestimonies();
    const index = testimonies.findIndex((m) => m.id === id);

    if (index === -1) return false;

    saveTestimonies(testimonies.filter((testimony) => testimony.id !== id));

    return true;
}

export default {
    index,
    show,
    store,
    update,
    remove,
};
