import { useEffect, useState } from 'react';
import testimonyService from '@/domain/services/Testimony.service';
import testimonyServiceMock from '@/domain/services/Testimony.service.mock';
import { Testimony } from '@/domain/models/Testimony.ts';
import config from "@/domain/config";

const service = config.onTest ? testimonyServiceMock : testimonyService;

export function useTestimonies() {
    const [testimonies, setTestimonies] = useState<Testimony[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchTestimonies = async () => {
        setLoading(true);
        const data = await service.index();
        setTestimonies(data);
        setLoading(false);
    };

    const addTestimony = async (data: Partial<Testimony>) => {
        const newTestimony = await service.store(data);
        if (newTestimony) setTestimonies((prev) => [...prev, newTestimony]);
        return newTestimony
    };

    const updateTestimony = async (id: number, data: Partial<Testimony>) => {
        const updated = await service.update(id, data);
        if (updated) {
            setTestimonies((prev) =>
                prev.map((testimony) => (testimony.id === id ? updated : testimony))
            );
        }
        return updated;
    };

    const deleteTestimony = async (id: number) => {
        const deleted = await service.remove(id);
        if (deleted) {
            setTestimonies((prev) =>
                prev.filter((testimony) => (testimony.id !== id))
            );
        }
        return deleted;
    };

    const storeOrUpdateTestimony = async (data: Partial<Testimony>|Testimony, id?: number|null) => {
        if(id) {
            return await updateTestimony(id, data);
        }

        return await addTestimony(data);
    }

    useEffect(() => { fetchTestimonies(); }, []);

    return {
        testimonies,
        loading,
        deleteTestimony,
        fetchTestimonies,
        addTestimony,
        updateTestimony,
        storeOrUpdateTestimony
    };
}


export function useTestimony(testimonyId?: number) {
    const [testimony, setTestimony] = useState<null|Testimony>(null);
    const [loading, setLoading] = useState(true);


    const fetchTestimony = async () => {

        if(testimonyId) {
            setLoading(true);
            const data = await service.show(testimonyId);
            setTestimony(data);
            setLoading(false);
        }
    };

    useEffect(() => { fetchTestimony(); }, []);

    return {
        loading,
        testimony,
        fetchTestimony,
    };
}
